import { connect } from 'react-redux';
import { selector, selectEnvironment } from '../index.js';
import EnvironmentSelector from '../components/EnvironmentSelector';

const mapStateToProps = state => ({
    environment: selector.getEnvironment(state),
    environments: selector.getEnvironments(state),
});

const mapDispatchToProps = {
    selectEnvironment
};

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentSelector);
