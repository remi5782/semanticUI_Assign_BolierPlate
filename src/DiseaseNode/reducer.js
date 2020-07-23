export default function DiseaseNodeReducer(state, action) {
	switch (action.type) {
		case "DISEASE_NODE_LOADING":
			return { ...state, isLoading: true }
		case "DISEASE_NODE_SUCCESS":
            return { ...state, isLoading: false, data: action.payload }
        case "DISEASE_NODE_FAIL":
            return {...state, isLoading: false, errMsg: action.payload}
		default:
			return state;
	}
}