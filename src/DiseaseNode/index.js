import React, { useReducer, useState, useEffect } from "react";
import { Card, Header, Button, Icon } from "semantic-ui-react";
import DiseaseNodeReducer from './reducer';
import fetchDiseaseNode from './action';

function DiseaseNode() {
    const [state, dispatch] = useReducer(DiseaseNodeReducer, { isLoading: false, errMsg: "" });
    const { isLoading, data, errMsg } = state;
    const disObject = data && data[Object.keys(data)[0]];
    const { nodeType, preferredName, altNames, description } = disObject || {};
    const [viewMore, setViewMore] = useState(false);
    useEffect(() => {
        if (!data && !isLoading && (errMsg === ""))
            fetchDiseaseNode(dispatch);
    }, [state.isLoading])

    function handleViewMore() {
        setViewMore((viewMore) => !viewMore);
    }
    return (
        <Card centered>
            {/* loading */}
            {isLoading && <Card.Content header="Fetching Results" meta="Hang Tight While we make a request" />}
            {/* on error */}
            {errMsg !== "" && <><Card.Content style={{ color: 'red' }} header="Facing Issues" meta="Please try after sometime" />
                <Card.Content style={{ height: '20rem' }}><Icon name="exclamation triangle" style={{ margin: '5rem', fontSize: '7rem', color: 'red' }} /><span style={{ fontSize: '1.5rem' }}>{errMsg}</span></Card.Content></>
            }
            {/* on incoming data */}
            {!isLoading && errMsg === '' && <Card.Content header={preferredName} meta={nodeType} />}
            {isLoading && <Card.Content style={{ height: '20rem' }}><div className="ui active loader"></div></Card.Content>}
            {!isLoading && data && <><Card.Content>
                <Header sub>Synonyms</Header>
                <div>
                    <div style={{
                        height: viewMore ? "auto" : '20px', overflow: 'hidden', whiteSpace: viewMore ? "normal" : "nowrap",
                        textOverflow: "ellipsis"
                    }}>
                        {altNames && altNames.join()}
                    </div>
                    <Button onClick={handleViewMore} className="ui primary button" style={{ margin: '0.5rem 0rem 0.5rem 0rem' }}>
                        {viewMore ? "View Less" : "View More"}
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