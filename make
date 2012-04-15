#!/usr/bin/env python
import sys
import shutil
import os

def cat():
    print("** Combining js files")
    cmd = 'cat src/*.js src/backend/*.js > recline.js'
    os.system(cmd)

def docs():
    # build docs
    print("** Building docs")

    docco_executable = os.environ.get('DOCCO_EXECUTABLE','docco')
    cmd = '%s src/model.js src/view.js src/view-grid.js src/view-graph.js src/view-map.js' % (docco_executable)
    os.system(cmd)
    if os.path.exists('/tmp/recline-docs'):
      shutil.rmtree('/tmp/recline-docs')
    os.makedirs('/tmp/recline-docs')
    os.system('mkdir -p docs/backend')
    files = '%s/src/backend/*.js' % os.getcwd()
    dest = '%s/docs/backend' % os.getcwd()
    os.system('cd /tmp/recline-docs && %s %s && mv docs/* %s' % (docco_executable,files, dest))
    print("** Docs built ok")

if __name__ == '__main__':
    if not len(sys.argv) > 1:
        print 'make cat | docs | all'
        sys.exit(1)
    action = sys.argv[1]
    if action == 'cat':
        cat()
    elif action == 'docs':
        docs()
    elif action == 'all':
        cat()
        docs()

