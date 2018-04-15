import { connect } from 'react-redux';
import { fetchAllStatuses } from '../../ServiceStatus';
import StatusPage from '../components';

const mapStateToProps = null;

const mapDispatchToProps = {
    fetchAllStatuses
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusPage);