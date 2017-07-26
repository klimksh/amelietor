import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import history from '../../src/history';
import HelperFunctions from '../HelperFunctions';
import {fetchSelctedProject, fetchQAData} from '../../core/actions/scactions';
import BubbleChart from '../BubbleChart/BubbleChart';
import {Spinner} from 'react-mdl';

class QualityAttributes extends React.Component {
  constructor(props) {
    super(props);
    let projectId = this.props.projectId === undefined ? HelperFunctions.getParameterByName("id", history.location.search) : this.props.projectId;
    if (Object.keys(this.props.selectedProject).length === 0 && this.props.selectedProject.constructor === Object) {
      this.props.dispatch(fetchSelctedProject(projectId));
    }

    if(this.props.qaData.length === 0) {
      this.props.dispatch(fetchQAData(projectId));
    }
  }

  render() {
    return (
      <div>
        <div style={{'textAlign': 'center'}}>
          {this.props.qaData.length === 0 && <Spinner /> }
        </div>
        {this.props.qaData.length > 0 && <BubbleChart data={this.props.qaData}/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {selectedProject, qaData} = state.screcs;
  return {selectedProject, qaData};
};

QualityAttributes.propTypes = {
  qaData: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(QualityAttributes);