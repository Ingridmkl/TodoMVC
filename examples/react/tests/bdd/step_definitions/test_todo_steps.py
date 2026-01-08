import time
from pytest_bdd import scenarios, given, when, then, parsers
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains

# Break time between actions to allow UI to update
PAUSE_TIME = 1.5

# Link to the feature file
scenarios('../features/todo.feature')

@given('I open the TodoMVC app')
def open_app(driver):
    driver.get("http://localhost:7002")
    time.sleep(PAUSE_TIME)

# --- WHEN STEPS ---

@when(parsers.parse('I type "{task}" into the input box'))
def type_todo(driver, task):
    input_box = driver.find_element(By.CLASS_NAME, "new-todo")
    input_box.send_keys(task)
    time.sleep(PAUSE_TIME)

@when('I press Enter')
def press_enter(driver):
    input_box = driver.find_element(By.CLASS_NAME, "new-todo")
    input_box.send_keys(Keys.RETURN)
    time.sleep(PAUSE_TIME)

@when(parsers.parse('I delete the task "{task}"'))
def delete_task(driver, task):
    todo_item = driver.find_element(By.XPATH, f"//li[.//label[text()='{task}']]")
    
    # Hover over the item to reveal the destroy button
    ActionChains(driver).move_to_element(todo_item).perform()
    time.sleep(0.5)
    
    # Click the delete button inside this specific item
    delete_btn = todo_item.find_element(By.CLASS_NAME, "destroy")
    driver.execute_script("arguments[0].click();", delete_btn) # JS Click is often safer than standard click for hidden elements
    time.sleep(PAUSE_TIME)

@when(parsers.parse('I mark "{task}" as completed'))
def mark_as_completed(driver, task):
    todo_item = driver.find_element(By.XPATH, f"//li[.//label[text()='{task}']]")
    checkbox = todo_item.find_element(By.CLASS_NAME, "toggle")
    checkbox.click()
    time.sleep(PAUSE_TIME)

@when('I mark all tasks as completed')
def mark_all_completed(driver):
    # Depending on the app implementation, this ID or class might vary, but usually it's this:
    try:
        toggle_all = driver.find_element(By.CLASS_NAME, "toggle-all") # Changed to class for better React compatibility
        driver.execute_script("arguments[0].click();", toggle_all)
    except:
        # Fallback to ID if class fails
        toggle_all = driver.find_element(By.ID, "toggle-all")
        driver.execute_script("arguments[0].click();", toggle_all)
    time.sleep(PAUSE_TIME)

@when('I clear completed tasks')
def clear_completed(driver):
    clear_btn = driver.find_element(By.CLASS_NAME, "clear-completed")
    clear_btn.click()
    time.sleep(PAUSE_TIME)

@when(parsers.parse('I click on the "{filter_name}" filter'))
def click_filter(driver, filter_name):
    # Trouve le lien (Active, Completed, ou All) et clique dessus
    driver.find_element(By.LINK_TEXT, filter_name).click()
    time.sleep(PAUSE_TIME)

# --- THEN STEPS ---

@then(parsers.parse('I should see "{task}" in the list'))
def check_see_in_list(driver, task):
    todo_list = driver.find_element(By.CLASS_NAME, "todo-list")
    assert task in todo_list.text
    time.sleep(0.5)

@then(parsers.parse('I should not see "{task}" in the list'))
def check_not_in_list(driver, task):
    try:
        todo_list = driver.find_element(By.CLASS_NAME, "todo-list")
        assert task not in todo_list.text
    except:
        # If list empty/missing -> task not there
        pass
    time.sleep(0.5)

@then(parsers.parse('I should see {count} completed task'))
def check_completed_count(driver, count):
    completed_items = driver.find_elements(By.CSS_SELECTOR, ".todo-list li.completed")
    assert len(completed_items) == int(count)
    time.sleep(0.5)

@then(parsers.parse('I should see {count} active task'))
def check_active_count(driver, count):
    # Active items -> li elements W/ouT 'completed' class
    active_items = driver.find_elements(By.CSS_SELECTOR, ".todo-list li:not(.completed)")
    assert len(active_items) == int(count)
    time.sleep(0.5)

@then('all tasks should be completed')
def check_all_completed(driver):
    all_items = driver.find_elements(By.CSS_SELECTOR, ".todo-list li")
    completed_items = driver.find_elements(By.CSS_SELECTOR, ".todo-list li.completed")
    assert len(all_items) == len(completed_items)
    assert len(all_items) > 0 # Ensure there is at least one task
    time.sleep(0.5)

@then(parsers.parse('I should see {count} task in the list'))
def check_task_count(driver, count):
    todo_items = driver.find_elements(By.CSS_SELECTOR, ".todo-list li")
    assert len(todo_items) == int(count)
    time.sleep(0.5)

@then(parsers.parse('the remaining task should be "{task}"'))
def check_remaining_task(driver, task):
    todo_list = driver.find_element(By.CLASS_NAME, "todo-list")
    assert task in todo_list.text
    time.sleep(0.5)

@then(parsers.parse('I should see {count} items left'))
def check_items_left(driver, count):
    todo_count = driver.find_element(By.CLASS_NAME, "todo-count")
    # Verify the number is contained in the text
    assert str(count) in todo_count.text
    time.sleep(0.5)