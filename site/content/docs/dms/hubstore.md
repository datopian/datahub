# HubStore

> [!warning]Work in Progress
This is is early stage and still a work in progress.

A HubStore maintains a catalog of organizations and their ownership of projects / datasets.

It's name derives from the common appelation of "Hub" for something that organizes a collection of individual items e.g. Git*Hub* or Data*Hub*. The HubStore handles the information that makes a Hub a Hub.

## Domain Model

* Organization
* Account (User)
* MembershipRole e.g. admin, editor etc
* Project (which has a Dataset)

Associations

* Organization --owns--> Project
* Organization --membership--> Account
  * Membership association has an associated MembershipRole.

Potential extras:

* Do we allow Accounts to own Projects or only Organizations? Yes, we do. I think this is a key use case.
* Organization Hierarchies: Organization --parent--> Organization. One could allow for hierarchies of organizations. We do not by default but it is possible to do so.
* Team: a convenient grouping of Accounts for the purpose of assigning permissions to something
  * All team members have the same status (if you want different statuses get different teams)
  * Team --membership--> Account (without a role)
  * Example: Github Teams
  * Comment: hirerarchical organizations *could* make much of the use case obsolete. IME teams are an annoying feature of github that bring complexity (who exactly has access to this thing, if i want to remove Person X from access i have to check all the teams with access etc).
