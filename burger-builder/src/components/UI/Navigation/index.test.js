import { configure, mount, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { AuthenticationContext} from "../Layout";
import Navigation from ".";
import NavigationItem from "./NavigationItem";

configure({ adapter: new Adapter() });

describe("Navigation", () => {
    it("Should render two NavigationItem and one Context COmsumer", () => {
        const wrapper = shallow(<Navigation />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(wrapper.find(AuthenticationContext.Consumer)).toHaveLength(1);
    });

    it("Should not render logout button when not authenticated", () => {
        const wrapper = mount(
            <BrowserRouter>
                <AuthenticationContext.Provider value={{isAuthenticated: false}}>
                    <Navigation />
                </AuthenticationContext.Provider>
            </BrowserRouter>
        );

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(wrapper.containsMatchingElement(<div>Logout</div>)).toEqual(false);
    });

    it("Should render logout button when authenticated", () => {
        const wrapper = mount(
            <BrowserRouter>
                <AuthenticationContext.Provider value={{isAuthenticated: true}}>
                    <Navigation />
                </AuthenticationContext.Provider>
            </BrowserRouter>
        );

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(wrapper.containsMatchingElement(<div>Logout</div>)).toEqual(true);
    });
});