import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashBoardItems from "./DashBoardItems";
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className={"large text-primary"}>Dashboard</h1>
      <p className={"lead"}> Welcome {user && user.name} </p>
      {profile !== null ? (
        <Fragment>
          <DashBoardItems />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className={"my-2"}>
            <button
              className={"btn btn-danger"}
              onClick={() => deleteAccount()}
            >
              Delete Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>No profile found! Please setup your profile</p>
          <Link to={"/create-profile"} className={"btn btn-primary my-1"}>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
