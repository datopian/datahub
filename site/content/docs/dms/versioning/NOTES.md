# Versioning Notes

## Notes

```bash

# all changes in timestamped order
# by "object" and "action"
# by "permissions area" (e.g. what org, what e.g. what org, what user, ...)
audit-log.db

# Dataset A r1 vmaster

revisions.db # r1
versions.db  # master
/master/datapackage.json
/master/data.csv

# Dataset A r2 - edited the metadata

/master/datapackage.json
/master/data.csv          # unchanged

/r1-{hash}/datapackage.json
/r1-{hash}/data.csv
...

```
