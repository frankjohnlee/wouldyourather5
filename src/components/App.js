import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

import { handleInitialData } from '../actions/shared'
import {connect} from 'react-redux';
import Dashboard from "./Dashboard";
import { Drawer, DrawerHeader, DrawerContent } from 'rmwc/Drawer';
import { List, ListItem, ListItemText } from 'rmwc/List';
import {Col, Grid, Row} from "react-flexbox-grid";
import { CONST_All_Questions, CONST_ANSWERED_ONLY, CONST_UNANSWERED_ONLY } from "./Dashboard";
import './App.css';
import QuestionCard from "./QuestionCard"
class App extends Component {



  componentDidMount(){
    /* When this component mounts get the data */
      this.props.dispatch(handleInitialData())
  }
  render() {
      const unasweredOnlyComponent = <Dashboard mode = { CONST_UNANSWERED_ONLY}/>;
    return (
        <Router>
            <Grid fluid>
                <Row>
                    <Col xs={3} md={3}>
                        <Drawer permanent>
                        <DrawerContent>
                            <DrawerHeader>
                                Menu
                            </DrawerHeader>
                                <Link to={'/'}  >
                                    <ListItem>
                                      <ListItemText>Home</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to={'answered'}  >
                                    <ListItem>
                                      <ListItemText>Answered</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to = {'/unanswered'}>
                                    <ListItem>
                                      <ListItemText>Unanswered</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to={'/all'}>
                                    <ListItem>
                                      <ListItemText>All Questions</ListItemText>
                                    </ListItem>
                                </Link>
                                <Link to={'/logout'}>
                                    <ListItem>
                                      <ListItemText>Logout</ListItemText>
                                    </ListItem>
                                </Link>
                            </DrawerContent>
                        </Drawer>
                    </Col>
                    <Col xs={7} md={7}>
                            {
                                this.props.loading === true
                                    ? null
                                    :
                                        <div>
                                            <Route path = '/' exact render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
                                            <Route path = '/answered'  render={()=><Dashboard mode = { CONST_ANSWERED_ONLY }/>}/>
                                            <Route path = '/unanswered'  render={()=><Dashboard mode = { CONST_UNANSWERED_ONLY }/>}/>
                                            <Route path = '/all'  render={()=><Dashboard mode = {CONST_All_Questions}/>}/>
                                            <Route path = '/question/:id'  render={()=><QuestionCard mode = { CONST_ANSWERED_ONLY }/>}/>
                                        </div>
                            }
                    </Col>
                </Row>
            </Grid>
        </Router>

    );
  }

  dashboardUnasweredOnly(){
      return
  }
}

function mapStateToProps({authedUser}){
   return {
       loading: authedUser === null,
   }
}

export default connect(mapStateToProps)(App);
