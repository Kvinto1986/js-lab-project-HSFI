import React from "react";
import { shallow } from "enzyme";
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Inspection from "./inspection";

const mockStore = configureMockStore();
const store = mockStore({});

describe("Testpage Component", () => {
    it('renders without crashing', () => {
        shallow( <Provider store={store}>
            <Inspection  />
        </Provider>);
    });
});
