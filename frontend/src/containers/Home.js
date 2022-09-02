import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import { BsPencilSquare } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

export default function Home() {
    const [premises, setPremises] = useState([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function onLoad() {
          if (!isAuthenticated) {
            return;
          }
      
          try {
            const premises = await loadPremises();
            setPremises(premises);
          } catch (e) {
            onError(e);
          }
      
          setIsLoading(false);
        }
      
        onLoad();
      }, [isAuthenticated]);
      
      function loadPremises() {
        return API.get("premises", "/premises");
      }

    function renderPremisesList(premises) {
        return (
            <>
              <LinkContainer to="/notes/new">
                <ListGroup.Item action className="py-3 text-nowrap text-truncate">
                  <BsPencilSquare size={17} />
                  <span className="ml-2 font-weight-bold">Create a new premise</span>
                </ListGroup.Item>
              </LinkContainer>
              {premises.map(({ premiseId, content, createdAt }) => (
                <LinkContainer key={premiseId} to={`/premises/${premiseId}`}>
                  <ListGroup.Item action>
                    <span className="font-weight-bold">
                      {content.trim().split("\n")[0]}
                    </span>
                    <br />
                    <span className="text-muted">
                      Created: {new Date(createdAt).toLocaleString()}
                    </span>
                  </ListGroup.Item>
                </LinkContainer>
              ))}
            </>
          );
      }
    
      function renderLander() {
        return (
          <div className="lander">
            <h1>Premises</h1>
            <p className="text-muted">The Story Development Application</p>
          </div>
        );
      }
    
      function renderPremises() {
        return (
          <div className="notes">
            <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Premises</h2>
            <ListGroup>{!isLoading && renderPremisesList(premises)}</ListGroup>
          </div>
        );
      }

    return (
        <div className="Home">
            {isAuthenticated ? renderPremises() : renderLander()}
        </div>
    );
}