import React from "react";

class RecrutationTaskAPI extends React.Component {
    constructor() {
        super()
        this.apiURL = 'http://localhost:3000/data';
    }

    loadData() {
        return fetch(this.apiURL)
        .then(resp => {
            if(resp.ok) {
                return resp.json();
            }
            return Promise.reject();
        })
    }
}

export default RecrutationTaskAPI;