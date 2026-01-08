Feature: Todo Management
  As a user
  I want to manage my daily tasks
  So that I don't forget them

Scenario: Add a new task
  Given I open the TodoMVC app
  When I type "Buy Coffee" into the input box
  And I press Enter
  Then I should see "Buy Coffee" in the list

Scenario: Create a task and delete it
  Given I open the TodoMVC app
  When I type "Buy Milk" into the input box
  And I press Enter
  And I delete the task "Buy Milk"
  Then I should not see "Buy Milk" in the list

Scenario: Add two tasks, mark one as completed
  Given I open the TodoMVC app
  When I type "Task 1" into the input box
  And I press Enter
  And I type "Task 2" into the input box
  And I press Enter
  And I mark "Task 1" as completed
  Then I should see 1 completed task
  And I should see 1 active task

Scenario: Mark all tasks as completed
  Given I open the TodoMVC app
  When I type "Task 1" into the input box
  And I press Enter
  And I type "Task 2" into the input box
  And I press Enter
  And I mark all tasks as completed
  Then all tasks should be completed

Scenario: Clear all completed tasks
  Given I open the TodoMVC app
  When I type "Task 1" into the input box
  And I press Enter
  And I type "Task 2" into the input box
  And I press Enter
  And I mark "Task 1" as completed
  And I clear completed tasks
  Then I should see 1 task in the list
  And the remaining task should be "Task 2"

Scenario: Create 5 tasks, mark one as completed, verify items left count
  Given I open the TodoMVC app
  When I type "Task 1" into the input box
  And I press Enter
  And I type "Task 2" into the input box
  And I press Enter
  And I type "Task 3" into the input box
  And I press Enter
  And I type "Task 4" into the input box
  And I press Enter
  And I type "Task 5" into the input box
  And I press Enter
  And I mark "Task 1" as completed
  Then I should see 4 items left

Scenario: Create 2 tasks, complete 1, filter by Active then Completed
  Given I open the TodoMVC app
  When I type "Task 1" into the input box
  And I press Enter
  And I type "Task 2" into the input box
  And I press Enter
  And I mark "Task 1" as completed
  And I click on the "Active" filter
  Then I should see 1 task in the list
  And I should not see "Task 1" in the list
  And I should see "Task 2" in the list
  When I click on the "Completed" filter
  Then I should see 1 task in the list
  And I should see "Task 1" in the list
  And I should not see "Task 2" in the list