//
//  <%=props.projectName%>UITests.swift
//  <%=props.projectName%>UITests
//
//  Created by 李茂峰 on 17/01/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import XCTest

class <%=props.projectName%>UITests: XCTestCase {

    override func setUp() {
        super.setUp()

        let app = XCUIApplication()
        setupSnapshot(app)
        app.launch()
    }

    override func tearDown() {
        super.tearDown()
    }

    func testExample() {
      let app = XCUIApplication()
      snapshot("home")
      app/*@START_MENU_TOKEN@*/.otherElements["去到设置."]/*[[".otherElements.matching(identifier: \"首页 去到设置.\").otherElements[\"去到设置.\"]",".otherElements[\"去到设置.\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
      snapshot("settings")
      app/*@START_MENU_TOKEN@*/.buttons["header-back"]/*[[".otherElements.matching(identifier: \"首页 去到设置. 测试截屏\").buttons[\"header-back\"]",".buttons[\"header-back\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()

    }

}
