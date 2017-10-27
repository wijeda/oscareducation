import unittest
import string
import random
from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By

# Run with "python3.5 WebDriverTest.py"

URL_HOMEPAGE = "http://127.0.0.1:8000"
URL_LOGIN = "http://127.0.0.1:8000/accounts/usernamelogin/"
URL_SCENARIO_CREATION = "http://127.0.0.1:8000/professor/train/create_scenario/"
URL_LIST_SCENARIO = "http://127.0.0.1:8000/professor/train/list_scenario/"


class SampleTest(unittest.TestCase):
    @classmethod
    def setUp(cls):
        # create a new Firefox session """
        cls.driver = webdriver.Chrome()
        cls.driver.implicitly_wait(30)
        cls.driver.maximize_window()

    # def test_scenario_creation(self):
    #     driver = self.driver
    #     driver.get(URL_LOGIN)
    #     self.fill_field("id_username", "professor")
    #     self.click_element_css("input[value='Connexion']")
    #     self.fill_field("id_password", "professor")
    #     self.click_element_css("input[value='Connexion']")
    #     self.driver.get("http://127.0.0.1:8000/professor/train/list_scenario/")
    #     self.click_element_id("addElement")
    #     assert "create_scenario" in self.driver.current_url

    def test_scenario_DB(self):
        driver = self.driver
        driver.get(URL_LOGIN)
        self.fill_field("id_username", "professor")
        self.click_element_css("input[value='Connexion']")
        self.fill_field("id_password", "professor")
        self.click_element_css("input[value='Connexion']")
        self.driver.get("http://127.0.0.1:8000/professor/train/list_scenario/")
        self.click_element_id("addElement")

        scenario_title = ''.join(random.choice(string.ascii_lowercase) for _ in range(6))

        self.fill_field("title", scenario_title)
        self.click_element_id("saveScenario")
        self.driver.get(URL_LIST_SCENARIO)
        body_text = self.driver.find_element_by_tag_name('body').text
        self.assertFalse(scenario_title in body_text)
        self.click_element_id("addElement")

        self.fill_field("title", scenario_title)
        self.fill_field("instructions", "test")
        self.click_element_id("saveScenario")
        self.driver.get(URL_LIST_SCENARIO)
        body_text = self.driver.find_element_by_tag_name('body').text
        self.assertTrue(scenario_title in body_text)
        self.click_element_css("img[alt='Supprimer la question']")

        # def tearDown(self):
        # close the browser window

    #   self.driver.quit()

    def is_element_present(self, how, what):
        """
        Helper method to confirm the presence of an element on page
        :params how: By locator type
        :params what: locator value
        """
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException:
            return False
        return True

    def click_element_id(self, id):
        el = self.driver.find_element_by_id(id)
        el.click()

    def click_element_css(self, selector):
        el = self.driver.find_element_by_css_selector(selector)
        el.click()

    def fill_field(self, id, text):
        el = self.driver.find_element_by_id(id)
        el.send_keys(text)


if __name__ == "__main__":
    unittest.main()
