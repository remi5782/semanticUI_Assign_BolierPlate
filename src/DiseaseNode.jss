import React, { useReducer, useState, useEffect } from "react";
import axios from 'axios';
import { Card, Header, Button } from "semantic-ui-react";

function DiseaseNodeReducer(state, action) {
	switch (action.type) {
		case "DISEASE_NODE_LOADING":
			return { ...state, isLoading: true }
		case "DISEASE_NODE_SUCCESS":
			return { isLoading: false, data: action.payload }
		default:
			return state;
	}
}
async function fetchDiseaseNode(dispatch) {
	dispatch({ type: 'DISEASE_NODE_LOADING' });
	try {
		const response = await axios.get('http://localhost:3001/diseaseNodes');
		dispatch({ type: 'DISEASE_NODE_SUCCESS', payload: response.data });

	} catch (err) {

	}
	return null;
}
function DiseaseNode() {
	const [state, dispatch] = useReducer(DiseaseNodeReducer, { isLoading: false });
	const { isLoading, data } = state;
	const disObject = data && data[Object.keys(data)[0]];
	const {nodeType, preferredName, altNames, description} = disObject || {};
	const [viewMore, setViewMore] = useState(false);
	useEffect(() => {
		if (!data && !isLoading)
			fetchDiseaseNode(dispatch);
	}, [state.isLoading])

	function handleViewMore(){
		setViewMore((viewMore)=> !viewMore );
	}
	return (
		<Card centered>
			<Card.Content header={isLoading ? "Fetching Results": preferredName} meta={isLoading ? "Hang Tight While we make a request": nodeType} />
			{isLoading && <Card.Content style={{height: '20rem'}}><div className="ui active loader"></div></Card.Content>}
			{!isLoading && <><Card.Content>
				<Header sub>Synonyms</Header>
				<div>
					<div style={{
						height: viewMore ? "auto" : '20px' , overflow: 'hidden', whiteSpace: viewMore ? "normal" :"nowrap" ,
						textOverflow: "ellipsis"
					}}>
						{altNames && altNames.join()}
				</div>
					<Button onClick={handleViewMore} className="ui primary button" style={{margin:'0.5rem 0rem 0.5rem 0rem'}}>
						{viewMore ? "View Less" :"View More"}
				</Button>
				</div>
			</Card.Content>
			<Card.Content>
				<Header sub>Description</Header>
				<span>
					{description}
				</span>
			</Card.Content></>}
		</Card>
	);
};

export default DiseaseNode;
