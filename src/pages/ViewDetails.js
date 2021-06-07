import React, { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import PersonIcon from "@material-ui/icons/Person";
import {
  AccountBox,
  Call,
  CastForEducation,
  Edit,
  Email,
  Event,
  Favorite,
  Group,
  Home,
  PeopleOutlineOutlined,
  Wc,
} from "@material-ui/icons";
import { useHistory } from "react-router";
import Rating from "@material-ui/lab/Rating";
import DomainIcon from "@material-ui/icons/Domain";
import { database, app } from "../mockfirebase";
import EditPersonalInfo from "../components/EditPersonalInfo";
import EditTeamInfo from "../components/EditTeamInfo";
import ViewTechSkills from "./ViewTechSkills";
import ViewSoftSkills from "./ViewSoftSkills";
import ViewOtherSkills from "./ViewOtherSkills";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    height: "40px",
    width: "40px",
  },
  card: {
    width: 345,
  },
  media: {
    height: 140,
  },
  corner: {
    paddingLeft: 20,
  },
}));

function ViewDetails() {
  const history = useHistory();
  const [personalInfo, setPersonalInfo] = useState("");
  const [teamInfo, setTeamInfo] = useState([]);
  const [techSkillsInfo, setTechSkillsInfo] = useState([]);
  const [softSkillsInfo, setSoftSkillsInfo] = useState([]);
  const [otherSkillsInfo, setOtherSkillsInfo] = useState([]);
  const [prevTeam, setPrevTeam] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    getPersonalInfo();
    getTeamInfo();
    getTechSkillsInfo();
    getSoftSkillsInfo();
    getOtherSkillsInfo();
  }, []);
  const getPersonalInfo = () => {
    database
      .collection("PersonalDetails")
      .doc(app.auth().currentUser.uid)
      .get()
      .then((snapshot) => setPersonalInfo(snapshot.data()))
      .catch((error) => console.log(error.message));
  };
  const getTeamInfo = () => {
    database
      .collection("TeamDetails")
      .doc(app.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        const list = [];
        setTeamInfo(snapshot.data());
        const pteam = snapshot.data().PrevTeams;
        list.push(pteam);
        setPrevTeam(list);
      })
      .catch((error) => console.log(error.message));
  };

  const getTechSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("TechSkills")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setTechSkillsInfo(list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getSoftSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("softSkills")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setSoftSkillsInfo(list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const getOtherSkillsInfo = () => {
    database
      .collection("Skillsets")
      .doc(app.auth().currentUser.uid)
      .collection("otherSkills")
      .get()
      .then((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({ id: doc.id, ...data });
        });
        setOtherSkillsInfo(list);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      {personalInfo &&
      teamInfo &&
      techSkillsInfo &&
      softSkillsInfo &&
      otherSkillsInfo ? (
        <React.Fragment>
          <Paper
            elevation={10}
            style={{ marginTop: "50px", width: "60%", marginLeft: "260px" }}
          >
            <Grid container>
              <Typography
                style={{ paddingTop: "30px" }}
                align="center"
                variant="h4"
                color="primary"
              >
                PERSONAL DETAILS{" "}
              </Typography>
              <EditPersonalInfo
                data={personalInfo}
                getpersonalinfo={getPersonalInfo}
              />
            </Grid>

            <Grid
              container
              xs={12}
              direction="row"
              spacing={10}
              style={{ marginLeft: "60px", marginTop: "5px" }}
            >
              <Grid item>
                <List className={classes.root}>
                  <ListItem>
                    <ListItemAvatar>
                      <PersonIcon className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Name  "
                      secondary={
                        personalInfo.firstname + " " + personalInfo.lastname
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Email className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email"
                      secondary={personalInfo.email}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Event className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="DOB"
                      secondary={personalInfo.dateOfBirth}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Wc className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Gender"
                      secondary={personalInfo.gender}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item>
                <List className={classes.root} style={{ marginLeft: "0px" }}>
                  <ListItem>
                    <ListItemAvatar>
                      <CastForEducation className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Highest Qualification "
                      secondary={personalInfo.qualification}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Event className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Date Of Joining"
                      secondary={personalInfo.dateOfJoining}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Call className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="PhoneNumber"
                      secondary={personalInfo.mobile}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Home className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Address"
                      secondary={personalInfo.address}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={10}
            style={{ marginTop: "40px", marginLeft: "257px", width: "60%" }}
          >
            <Typography
              style={{ paddingTop: "30px" }}
              align="center"
              variant="h4"
              color="primary"
            >
              SKILLSET
            </Typography>
            <Grid
              xs={12}
              container
              spacing={6}
              direction="row"
              wrap="wrap"
              style={{ marginLeft: "30px", marginTop: "10px" }}
            >
              <Grid item>
                <ViewTechSkills
                  skills={techSkillsInfo}
                  gettech={getTechSkillsInfo}
                />
              </Grid>
              <Grid item>
                <ViewSoftSkills
                  skills={softSkillsInfo}
                  getsoft={getSoftSkillsInfo}
                />
              </Grid>
              <Grid item>
                <ViewOtherSkills />
              </Grid>
            </Grid>

            <Grid container direction="row-reverse">
              <Button
                variant="contained"
                color="primary"
                style={{ margin: "40px" }}
                onClick={() => history.push("/skillset")}
              >
                <Edit
                  style={{ marginRight: "5px", width: "20px", height: "20px" }}
                />{" "}
                Edit
              </Button>
            </Grid>
          </Paper>

          <Paper
            elevation={10}
            style={{ marginTop: "50px", width: "60%", marginLeft: "260px" }}
          >
            <Typography
              style={{ paddingTop: "30px" }}
              align="center"
              variant="h4"
              color="primary"
            >
              TEAM DETAILS{" "}
            </Typography>

            <Grid
              container
              xs={12}
              direction="row"
              spacing={10}
              style={{ marginLeft: "60px", marginTop: "5px" }}
            >
              <Grid item>
                <List className={classes.root}>
                  <ListItem>
                    <ListItemAvatar>
                      <Group className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Name  "
                      secondary={teamInfo.TeamName}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <Event className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Years of experience"
                      secondary={teamInfo.Experience}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item>
                <List className={classes.root} style={{ marginLeft: "0px" }}>
                  <ListItem>
                    <ListItemAvatar>
                      <DomainIcon className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText
                      primary="Division/Domain  "
                      secondary={teamInfo.Division}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem>
                    <ListItemAvatar>
                      <AccountBox className={classes.icon} />
                    </ListItemAvatar>
                    <ListItemText primary="Role " secondary={teamInfo.Role} />
                  </ListItem>
                </List>
              </Grid>
              <Grid item>
                <Card style={{ width: "220px" }} className={classes.card}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://cdn1.careeraddict.com/uploads/article/58721/illustration-group-people-team-meeting.jpg"
                      title="Other skills"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Previous TeamNames
                      </Typography>

                      <Typography component="p">
                        {prevTeam.map((team) => (
                          <ListItem>
                            <PeopleOutlineOutlined />{" "}
                            <Typography
                              gutterBottom
                              variant="body2"
                              color="secondary"
                              style={{ marginLeft: "5px" }}
                            >
                              {team}
                            </Typography>
                          </ListItem>
                        ))}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>

            <Grid container direction="row-reverse">
              {/* <Button variant="contained" color="primary" style={{margin:"40px"}} onClick={()=>(history.push('/teamdetails'))} ><Edit style={{marginRight:"5px",width:"20px",height:"20px"}}/> Edit</Button> */}
              <EditTeamInfo data={teamInfo} />
            </Grid>
          </Paper>
        </React.Fragment>
      ) : (
        <Paper elevation={10} style={{ margin: "50px" }}>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Dear Employee! Kindly enter your details and view the same here!!!
          </Typography>

          <Button
            variant="contained"
            style={{ margin: "25px" }}
            color="secondary"
            onClick={() => history.push("/")}
          >
            Click here to fill details
          </Button>
        </Paper>
      )}
    </div>
  );
}

export default ViewDetails;
