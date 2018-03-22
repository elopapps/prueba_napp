import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import './List.css';
import Item from '../../components/Item/Item';
import Filter from '../../components/Filter/Filter';
import { withRouter } from "react-router-dom";

class List extends Component{

    state = {
        items : [],
        currentPage : 0,
        selectedItemId : null,        
        filteredItems:[],
        hasMorePages:true,
        isLoading:false,
        lastPageLoads : {}
    }

    nameChangedHandler = ( e ) => {
        let search = e.target.value;
        let transformedItems = this.reduceItems({...this.state.items});
        if(search.length){
            this.setState({hasMorePages:false});
            let filteredItems = transformedItems.filter(oompa => (oompa.first_name + oompa.last_name).toUpperCase().indexOf(search.toUpperCase())>-1 
                                                                    || oompa.profession.toUpperCase().indexOf(search.toUpperCase())>-1
                                                                    || (search.toUpperCase()==="MAN" && oompa.gender==="M")
                                                                    || (search.toUpperCase()==="WOMAN" && oompa.gender==="F"));
            console.log("FILTERED ITEMS: ", filteredItems);
            this.setState({filteredItems : filteredItems});
        }
        else{
            this.setState({hasMorePages:true});
            this.setState({filteredItems : transformedItems});
        }
    }

    hasPassed24H = (page) => {
        console.log('La página es la ' , page);
        const now = Date.now();
        const mili24H = 86400000;
        let loads = {...this.state.lastPageLoads};
        if(!Object.keys( loads ).length){
            let cachedLoads = JSON.parse(localStorage.getItem('loads'));
            loads = cachedLoads || {};
            this.setState({lastPageLoads : loads});

            console.log('GETTING LOADS FROM LOCAL STORAGE');
        }

        console.log('Does Load have the page property?' , loads.hasOwnProperty(page));
        console.log('LOADS OBJECT', loads);
        
        if(loads.hasOwnProperty(page)){
            console.log("HAN PASADO 24 HORAS? ", (loads[page] - now) > mili24H);
            return ((loads[page] - now) > mili24H)
        }
        else{
            return true; //First time, fetch from the server
        }
        
    }

    loadLocalData = (page) => {
        const cachedItems = localStorage.getItem('items');
        if (cachedItems) {
            let parsedItems = JSON.parse(cachedItems);
            let pageItems = {[page]:parsedItems[page]};
            let globalItems = {...this.state.items, ...pageItems};
            this.setState({ items: globalItems,filteredItems:this.reduceItems(globalItems) });
        }
        else{
            this.setState({ items: {},filteredItems:[] });
        }

        console.log("LOADING LOCAL DATA");
    }

    loadServerData = (page) => {
        let curPage = this.state.currentPage + 1;
        const endPoint = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=' + curPage;
        this.setState({isLoading:true});
        axios.get( endPoint )
            .then( response => {
                this.setState({isLoading:false});
                console.log('RESPONSE', response);
                let items = response.data.results;
                let newItem ={[page]:items};
                let spreadObject = {...this.state.items,...newItem};
                const pageTimes = {...this.state.lastPageLoads};
                pageTimes[page] = Date.now();
                this.setState({items: spreadObject,filteredItems:this.reduceItems(spreadObject), currentPage : page, lastPageLoads : pageTimes});
                localStorage.setItem('loads', JSON.stringify(pageTimes));
                localStorage.setItem('items',JSON.stringify(spreadObject));
            })
            .catch(function (error) {
                this.setState({isLoading:false});
                console.log(error);
            }); 

        console.log("LOADING SERVER DATA");
    }

    fetchData = () => {
        //let storedPage = JSON.parse(localStorage.getItem('currPage'));
        //const currPage = storedPage===null?this.state.currentPage + 1:storedPage+1;
        const currPage = this.state.currentPage + 1;
        this.hasPassed24H(currPage)?this.loadServerData(currPage) : this.loadLocalData(currPage);
        this.setState({currentPage : currPage});
        //localStorage.setItem('currPage',JSON.stringify(currPage));

    }

    componentDidMount(){
        this.fetchData();
    }

    itemSelectedHadler = (id) => {
        //this.setState({selectedItemId: id});
        this.props.history.push( 'details/' + id );
    }

    reduceItems = (spread) =>{
        return Object.keys( spread )
            .map( page => {
                return [...( spread[page] )]
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);
    }

    render(){
        let spreadItems = {...this.state.items};
        console.log('SPREAD ITEMS', spreadItems);

        let transformedItems = this.reduceItems({...spreadItems});
        {/*let transformedItems = Object.keys( spreadItems )
            .map( page => {
                return [...( spreadItems[page] )]
            })
            .reduce((arr, el) => {
                return arr.concat(el)
            }, []);*/}

        console.log('TRANSFORMED ITEMS',transformedItems);

        let items = [...this.state.filteredItems].map(item => {
            return <Item 
                key={item.id} 
                image={item.image} 
                name={item.first_name + " " + item.last_name }
                gender={item.gender}
                profession={item.profession}
                clicked={() => this.itemSelectedHadler(item.id)}/>;
        });

        return(
            <div>
                <div>
                <Filter
                changed={this.nameChangedHandler}/>
                    <div className="Presentation">
                        <p className="Title">Find your Oompa Loompa</p>
                        <h2>There are more than 100k</h2>
                    </div>
                </div>
                <div className="Items container">
                        <InfiniteScroll
                            pullDownToRefresh
                     
                            refreshFunction={this.fetchData}
                            next={this.fetchData}
                            hasMore={this.state.hasMorePages}
                            loader={this.state.isLoading?<h4>Loading...</h4>:<p></p>}
                            endMessage={
                                <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                                </p>
                            }>
                            <div className="row">
                                {items}
                            </div>
                        </InfiniteScroll>
                    
                </div>
            </div>
        )
    }
}

export default withRouter(List);