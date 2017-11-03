import unittest
import string
import random
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By

# Run with "python3.5 *test name*.py"

URL_HOMEPAGE = "http://127.0.0.1:8000"
URL_LOGIN = "http://127.0.0.1:8000/accounts/usernamelogin/"
URL_SCENARIO_CREATION = "http://127.0.0.1:8000/professor/train/create_scenario/"
URL_LIST_SCENARIO = "http://127.0.0.1:8000/professor/train/list_scenario/"


class SampleTest(unittest.TestCase):
    def setUp(self):
        # create a new Chrome session
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(30)
        self.driver.maximize_window()
        self.driver.get(URL_LOGIN)
        self.fill_field("id_username", "professor")
        self.click_element_css("input[value='Connexion']")
        self.fill_field("id_password", "professor")
        self.click_element_css("input[value='Connexion']")

    def test_creation_deletion(self):

        driver = self.driver
        driver.get(URL_LIST_SCENARIO)

        self.click_element_id("addElement")

        # Generation of a random scenario name
        scenario_title = ''.join(random.choice(string.ascii_lowercase) for _ in range(6))
        #
        #     # Check if a wrongly created scenario is in the list
        #     self.fill_field("title", scenario_title)
        #     self.click_element_id("saveScenario")
        #     driver.get(URL_LIST_SCENARIO)
        #     body_text = self.driver.find_element_by_tag_name('body').text
        #     self.assertFalse(scenario_title in body_text)
        #
        # Check if a rightly created scenario is in the list
        self.click_element_id("addElement")
        self.fill_field("title", scenario_title)
        self.fill_field("instructions", "test")
        self.click_element_id("saveScenario")
        driver.get(URL_LIST_SCENARIO)
        body_text = self.driver.find_element_by_tag_name('body').text
        self.assertTrue(scenario_title in body_text)

    def test_edit_scenario(self):
        driver = self.driver
        driver.get(URL_LIST_SCENARIO)

        scenario_title = ''.join(random.choice(string.ascii_lowercase) for _ in range(6))

        self.click_element_id("addElement")
        self.fill_field("title", scenario_title)
        self.fill_field("instructions", "test")
        self.fill_field("skill", "test")
        self.click_element_id("saveScenario")
        # driver.get(URL_LIST_SCENARIO)
        # driver.refresh()
        self.click_element_css("img[alt = 'Editer la question']")

        self.fill_field("title", "new title")
        self.fill_field("instructions", "new instructions")
        self.fill_field("skill", "new skill")

        self.click_element_id("addElement")
        self.click_element_id("addElementVideo")
        self.fill_field("vid_url", "https://www.youtube.com/watch?v=2bjk26RwjyU")
        self.click_element_id("addVid")

        self.click_element_id("addElementImg")
        self.fill_field("img_url", "https://i.imgur.com/UkiM2YH.jpg")
        self.click_element_id("addImg")

        self.scroll_bottom()
        self.click_element_id("saveScenario")
        # driver.get(URL_LIST_SCENARIO)
        # driver.refresh()

        self.click_element_css("img[alt = 'Editer la question']")
        self.assertTrue(self.fieldText("title") == "new title")
        self.assertTrue(self.fieldText("instructions") == "new instructions")
        self.assertTrue(self.fieldText("skill") == "new skill")
        self.assertTrue(self.is_element_present(By.CSS_SELECTOR, "iframe[class = 'video']"))

    def tearDown(self):
        # close the browser window and clear test scenarios
        self.driver.get(URL_LIST_SCENARIO)
        if self.is_element_present(By.CSS_SELECTOR, "img[alt = 'Supprimer la question']"):
            self.click_element_css("img[alt = 'Supprimer la question']")
        self.driver.quit()

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

    def click_element_id(self, el_id):
        el = self.driver.find_element_by_id(el_id)
        ActionChains(self.driver).move_to_element(el).click(el).perform()

    def click_element_css(self, selector):
        el = self.driver.find_element_by_css_selector(selector)
        ActionChains(self.driver).move_to_element(el).click(el).perform()

    def scroll_bottom(self):
        self.driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

    def fill_field(self, el_id, text):
        el = self.driver.find_element_by_id(el_id)
        el.clear()
        el.send_keys(text)

    def fieldText(self, el_id):
        el = self.driver.find_element_by_id(el_id)
        return el.get_attribute("value")


if __name__ == "__main__":
    unittest.main()
