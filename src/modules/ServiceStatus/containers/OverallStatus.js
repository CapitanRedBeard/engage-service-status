import { connect } from 'react-redux';
import { selector } from '../index.js';
import OverallStatus from '../components/OverallStatus';

const mapStateToProps = state => ({
    overallStatus: selector.getOverallStatus(state),
});

export default connect(mapStateToProps)(OverallStatus);
