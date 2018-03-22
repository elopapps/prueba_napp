import React, { Component } from 'react';
import axios from 'axios';
import './Detail.css';
import Detailed from '../../components/Detailed/Detailed';

class Detail extends Component{

    state = {
        details : [],
        currentDetail : null,
        isLoading:false,
        lastDetailLoads : {}
    }

    hasPassed24H = (id) => {
        console.log('El detalle el el de id  ' , id);
        const now = Date.now();
        const mili24H = 86400000;
        let details = {...this.state.lastDetailLoads};
        if(!Object.keys( details ).length){
            let cachedDetails = JSON.parse(localStorage.getItem('details'));
            details = cachedDetails || {};
            this.setState({lastDetailLoads : details});

            console.log('GETTING LOADS FROM LOCAL STORAGE');
        }

        console.log('Does Load have the page property?' , details.hasOwnProperty(id));
        console.log('LOADS OBJECT', details);
        
        if(details.hasOwnProperty(id)){
            console.log("HAN PASADO 24 HORAS? ", (details[id] - now) > mili24H);
            return ((details[id] - now) > mili24H)
        }
        else{
            return true; //First time, fetch from the server
        }
        
    }

    loadLocalDetail = (id) => {
        const cachedDetails = localStorage.getItem('details');
        if (cachedDetails) {
          this.setState({ details: JSON.parse(cachedDetails) });
        }
        else{
            this.setState({ details: {} });
        }

        console.log("LOADING LOCAL DATA");
    }

    loadServerDetail = (id) => {
        this.setState({isLoading:true});
        const endPoint = 'https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/' + id;
        axios.get( endPoint )
            .then( response => {
                this.setState({isLoading:false});
                console.log('RESPONSE', response);
                let detail = response.data;
                let newDetail ={[id]:detail};
                let details = {...this.state.details, ...newDetail};
                const detailTimes = {...this.state.lastDetailLoads};
                detailTimes[id] = Date.now();
                this.setState({details: details, currentDetail: id, lastDetailLoads : detailTimes});
                //localStorage.setItem('loads', JSON.stringify(pageTimes));
                //localStorage.setItem('items',JSON.stringify(spreadObject));
            } 
        )
        .catch(function (error) {
            this.setState({isLoading:false});
            console.log(error);
        }); 

        console.log("LOADING SERVER DATA");
    }

    fetchData = (id) => {
        console.log('PASSED ID ', id);
        this.hasPassed24H(id)?this.loadServerDetail(id) : this.loadLocalDetail(id);
        this.setState({currentDetail : id});

    }

    componentDidMount(){
        let id = this.props.match.params.id;
        this.fetchData(id);
    }

    render(){
        let details = {...this.state.details};
        let index = this.state.currentDetail;
        let detail = details[index];
        let transformedDetail = detail?<Detailed 
                    key={index} 
                    image={detail.image}
                    name={detail.first_name + " " + detail.last_name}
                    gender={detail.gender}
                    profession={detail.profession}
                    quota={detail.description}/>:null;

        return(
            <div>
                <div className="Detail container">
                    {this.state.isLoading?<div>Loading...</div>:transformedDetail} 
                </div>
            </div>
        )
    }
}

export default Detail;