import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { NavLink } from "react-router-dom";

import NavigationItem from "./NavigationItem";

configure({ adapter: new Adapter() });

describe("NavigationItem", () => {
    let mockProps;

    beforeEach(() => {
        mockProps = {
            exact: true,
            to: "to",
            clickNavHandler: jest.fn()
        };
    });

    it("Should render NavLink and correctly set its props", () => {
        const wrapper = shallow(
            <NavigationItem
                exact={mockProps.exact}
                to={mockProps.to}
                clickNavHandler={mockProps.clickNavHandler}
            />
        );

        expect(wrapper.containsMatchingElement(
            <NavLink
                exact={mockProps.exact}
                to={mockProps.to}
            />
        )).toEqual(true);

        wrapper.find("NavLink").simulate("click");
        expect(mockProps.clickNavHandler).toHaveBeenCalledTimes(1);
    });
});