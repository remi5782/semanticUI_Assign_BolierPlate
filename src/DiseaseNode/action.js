import axios from 'axios';
export default async function fetchDiseaseNode(dispatch) {
	dispatch({ type: 'DISEASE_NODE_LOADING' });
	try {
		const response = await axios.get('http://localhost:3001/diseaseNodes');
		dispatch({ type: 'DISEASE_NODE_SUCCESS', payload: response.data });

	} catch (err) {
        console.log(err.message);
        dispatch({type: 'DISEASE_NODE_FAIL', payload: err.message});
	}
	return null;
}