import { connect } from 'react-redux';
import { testAction } from '../Actions/actions';
import TestComponent from '../Components/TestComponent'

const mapStateToProps = state => {
    return {
        value: state.value
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onClick: (value) => {
            props.model.backendCall(value + 1);
        }
    }
}

const TestContainer = connect(mapStateToProps, mapDispatchToProps) (
    TestComponent
);

export default TestContainer;