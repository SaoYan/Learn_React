import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import * as react from "react";

import Navigation from ".";
import NavigationItem from "./NavigationItem";

configure({ adapter: new Adapter() });

describe("Navigation", () => {
    let useContextSpy;

    afterEach(() => {
        jest.clearAllMocks();
        if (useContextSpy) {
            useContextSpy.mockRestore();
        }
    });

    it("Should render two NavigationItem ", () => {
        const wrapper = shallow(<Navigation />);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it("Should not render logout button when not authenticated", () => {
        useContextSpy = jest.spyOn(react, "useContext").mockImplementation(() => {
            return { isAuthenticated: false };
        });

        const wrapper = shallow(<Navigation />);

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(wrapper.containsMatchingElement(<div>Logout</div>)).toEqual(false);
    });

    it("Should render logout button when authenticated", () => {
        useContextSpy = jest.spyOn(react, "useContext").mockImplementation(() => {
            return { isAuthenticated: true };
        });

        const wrapper = shallow(<Navigation />);

        expect(wrapper.find(NavigationItem)).toHaveLength(2);
        expect(wrapper.containsMatchingElement(<div>Logout</div>)).toEqual(true);
    });
});