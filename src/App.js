import React from "react";
import DiseaseNode from "./DiseaseNode";
import { Container } from "semantic-ui-react";

function App() {
	return (
		<div className="App">
			<Container style={{ margin: 20 }}>
				<DiseaseNode />
			</Container>
		</div>
	);
}

export default App;
