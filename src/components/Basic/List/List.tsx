import React, { Component } from 'react';
import "./List.scss";

interface MyClassComponentProps {
  data: Array<any>;
  renderItem: (item: any, index: number) => JSX.Element;
  dataRequired: () => void; // Function to fetch more data
  loadingSize: number;
  isDataEnded : boolean;
  delay ?: number;
  horizontalList ?: boolean;
  loaderComponent ?: () => void
  endMessageComponent ?:() => void;
  hideEndMessageComponent ?: boolean;
}

interface MyClassComponentState {
  loadedData: Array<any>;
  isLoading: boolean;
  loadingSize : number;
  isDataEnded : boolean;
  hideEndMessageComponent : boolean;
}

export class List extends Component<MyClassComponentProps, MyClassComponentState> {
  private dataStock = new Array<any>();
  private loadingRef : HTMLDivElement | null = null;
  private observer: IntersectionObserver | null = null;
  private initialDataRendering :boolean = true;

  constructor(props: MyClassComponentProps) {
    super(props);
    this.dataStock = this.props.data;
    this.state = {
      loadedData: this.props.data.slice(0, this.props.loadingSize),
      isLoading: false,
      loadingSize : this.props.loadingSize,
      isDataEnded : this.props.isDataEnded,
      hideEndMessageComponent : this.props.hideEndMessageComponent ?? false,
    };
  }

  componentDidMount(): void {
      this.createObserver();
  }

  componentDidUpdate(prevProps: Readonly<MyClassComponentProps>, {}): void {
      if(!this.initialDataRendering){
          if(this.props.data != prevProps.data){
              this.dataStock = this.props.data;
              this.loadMoreData();
              this.initialDataRendering = true;
          }
      }

      if(this.props.isDataEnded != prevProps.isDataEnded){
        this.setState({isDataEnded : this.props.isDataEnded})
        this.loadMoreData();
      }

      if(this.props.hideEndMessageComponent != prevProps.hideEndMessageComponent){
         this.setState({hideEndMessageComponent : this.props.hideEndMessageComponent ?? false})
      }

  }

  private loadMoreData = () => {
     setTimeout(() => {
        if(!this.state.isDataEnded){
          this.setState({isLoading : true})
          if(this.dataStock.length > this.state.loadedData.length){
            if(this.dataStock.length >= (this.state.loadedData.length + this.state.loadingSize)){  
              let newData = this.dataStock.slice(this.state.loadedData.length, (this.state.loadedData.length+this.state.loadingSize+1))
              this.setState({loadedData : [...this.state.loadedData, ...newData], isLoading: false});
              return;
            }else{
              let newData = this.dataStock.slice(this.state.loadedData.length, this.dataStock.length)
              this.setState({loadedData : [...this.state.loadedData,...newData], isLoading: false});
              return;
            }
         }
  
          (!this.state.isDataEnded) && this.props.dataRequired();
          this.initialDataRendering = false;
        }else{
          this.setState({isLoading : false});
        }
    },(this.props.delay || 200));

  }

  componentWillUnmount(): void {
      if(this.observer){
        this.observer.disconnect();
      }
  }

  private createObserver(){
     if(!("IntersectionObserver" in window)){
      return
     }

     this.observer = new IntersectionObserver((entries) => {
       if(entries[0].isIntersecting && !this.state.isLoading){
           this.loadMoreData();
       }

     },{
       threshold: 0,
     })

     if(this.loadingRef){
       this.observer.observe(this.loadingRef)
     }
     
  }



  
  render() {
    return (
      <div className={this.props.horizontalList ? "DGR-Horizontal-List DGR-list-Container" : "DGR-list-Container"} >
        {
          this.state.loadedData.map((item, index)=>{
            return(
              <div key={index}>{this.props.renderItem(item, index)}</div>
            )
          })
        }
        {(!this.state.isLoading && this.state.isDataEnded && !this.props.hideEndMessageComponent) && <div>{(this.props.endMessageComponent && this.props.endMessageComponent()) || "List Ended..."}</div>}
         <div className={(this.state.isDataEnded && !this.state.isLoading) ? "DGR-hide-loader" : "DGR-show-loader"} ref={(ref)=>this.loadingRef = ref} >{(this.props.loaderComponent && this.props.loaderComponent()) ||   "loading..."}</div>
      </div>
    );
  }
}

export default List;
