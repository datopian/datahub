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
    cmd = 'docco src/model.js src/view.js src/view-grid.js src/view-flot-graph.js'
    os.system(cmd)
    if os.path.exists('/tmp/recline-docs'):
      shutil.rmtree('/tmp/recline-docs')
    os.makedirs('/tmp/recline-docs')
    os.system('mkdir -p docs/backend')
    files = '%s/src/backend/*.js' % os.getcwd()
    dest = '%s/docs/backend' % os.getcwd()
    os.system('cd /tmp/recline-docs && docco %s && mv docs/* %s' % (files, dest))
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

