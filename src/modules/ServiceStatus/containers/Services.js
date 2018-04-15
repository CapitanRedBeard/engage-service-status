import { connect } from 'react-redux';
import { selector, selectEnvironment } from '../index.js';
import Services from '../components/Services';

const mapStateToProps = state => ({
    services: selector.getServices(state),
    statuses: selector.getStatuses(state),
});

const mapDispatchToProps = {
    selectEnvironment
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
