#!/usr/bin/env python
import sys
import shutil
import os

def cat():
    print("** Combining js files")
    cmd = 'ls src/*.js | grep -v couchdb | xargs cat  > dist/recline.js'
    os.system(cmd)

    cmd = 'cat src/model.js src/backend.memory.js > dist/recline.dataset.js'
    os.system(cmd)

    print("** Combining css files")
    cmd = 'cat css/*.css > dist/recline.css'
    os.system(cmd)

def docs():
    # build docs
    print("** Building docs")

    docco_executable = os.environ.get('DOCCO_EXECUTABLE','docco')
    if os.path.exists('/tmp/recline-docs'):
      shutil.rmtree('/tmp/recline-docs')
    os.makedirs('/tmp/recline-docs')
    files = '%s/src/*.js' % os.getcwd()
    dest = '%s/docs/src' % os.getcwd()
    os.system('cd /tmp/recline-docs && %s %s && mv docs/* %s' % (docco_executable,files, dest))
    print("** Docs built ok")

def minify():
    cmd = 'uglifyjs -o %s %s' % ('dist/recline.min.js', 'dist/recline.js')
    os.system(cmd)

    cmd = 'uglifyjs -o %s %s' % ('dist/recline.dataset.min.js', 'dist/recline.dataset.js')
    os.system(cmd)

if __name__ == '__main__':
    if not len(sys.argv) > 1:
        print 'make cat | docs | minify | all'
        sys.exit(1)
    action = sys.argv[1]
    if action == 'cat':
        cat()
    elif action == 'docs':
        docs()
    elif action == 'minify':
        minify()
    elif action == 'all':
        cat()
        docs()
        minify()

