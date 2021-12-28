import React from "react";
import RecrutationTaskAPI from "./RecrutationTaskAPI";
import {v4 as uuid} from 'uuid';

class RecrutationTask extends React.Component {
    constructor() {
        super();
        this.api = new RecrutationTaskAPI();
    }

    state={
        searchQuery: '',
        database:[],
    }
    
    render() {
        return(
            <section className="section__inputs">
                {this.renderHandle()}
                <div>
                    <form className="section__form">
                        <label>
                            <input className="form__input" placeholder="Search by description" onChange={this.getValues}></input>
                        </label>
                    </form>
                </div>
            </section>
           
        )
    }

    componentDidMount(){
        this.api.loadData()
        .then(data => this.uploadDatabase(data))
        .catch(err => console.log(err.message))
        .finally(console.log('Data uploaded done'))
    }

    uploadDatabase(data) {
        this.setState({
            database: data,
        });
    }

    renderHandle() {
        const {database, searchQuery} = this.state;

        if(database.length > 0) {
            const {data} = this.state.database[0].response;

            if(searchQuery !== '') {
                const description = database[0].response.data;
                const filteredData = description.filter(value => {
                    return value.description.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0;
                })
                
                if(filteredData.length > 0) {
                    return this.renderTable(filteredData)
                }

                return (
                    <h1 className="alert">No data found</h1>
                )
            }

            return this.renderTable(data);
        }

        return(
            <h1 className="alert">No data uploaded</h1>
        )
    }

    renderTable(data) {
        return (
            <table className="section__table">
                    <thead className="table__header">
                        <tr>
                            <td>WO ID</td>
                            <td>Description</td>
                            <td>Received date</td>
                            <td>Assigned to</td>
                            <td>Status</td>
                            <td>Priority</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showData(data)}
                    </tbody>
                </table>
        )
    }

    showData(data) {
        const table = data.map(informations => {
            const {assigned_to, description, priority, received_date, status, work_order_id} = informations;

            const assigned = assigned_to.map(informations => {
                const {person_name, status} = informations;
                return (
                    <li key={person_name+status}>
                        {person_name} (<span className="important">{status}</span>)
                    </li>
                )
            });

            return (
                <tr key={uuid()}>
                    <td className="table__data">{work_order_id}</td>
                    <td className="table__data">{description}</td>
                    <td className="table__data">{received_date}</td>
                    <td className="table__data"><ul>{assigned}</ul></td>
                    <td className="table__data">{status}</td>
                    <td className="table__data">{priority}</td>
                </tr>
            )
        });
        return table;
    }

    getValues = e => {
        this.setState({
            searchQuery: e.target.value,
        });
    }
}

export default RecrutationTask;