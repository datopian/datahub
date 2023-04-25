# Data Flows + Factory - Research

## Tooling

* Luigi & Airflow
  * These are task runners - managing a dependency graph between 1000s of tasks. 
  * Neither of them focus on actual data processing and are not a data streaming solution. Tasks do not move data from one to the other.
  * AirFlow: see further analysis below
* Nifi: Server based, Java, XML - not really suitable for quick prototyping 
* Cascading: Only Java support
* Bubbles http://bubbles.databrewery.org/documentation.html - https://www.slideshare.net/Stiivi/data-brewery-2-data-objects
* mETL https://github.com/ceumicrodata/mETL mito ETL (yaml config files)
* Apache Beam: see below
* https://delta.io/ - acid for data lakes (mid 2020). Comes out of DataBricks. Is this pattern or tooling?


## Concepts

* Stream and Batch dichotomy is probably a false one -- and unhelpful. Batch is just some grouping of stream. Batch done regularly enough starts to be a stream.
* More useful is complete vs incomplete data sources
* Hard part of streaming (or batch) work is handling case where events arrive "late". For example, let's say i want to total up total transaction volume at a bank per day ... but some transactions arrived at the server late e.g. a transaction at 2355 actually arrives at 1207 because of network delay or some other issue then if i batch at 1200 based on what has arrived i have an issue. Most of work and complexity in Beam / DataFlow model relates to this.
* Essential duality between flows and states via difference and wum. E.g. transaction and balance:
  * Balance over time -- differenced --> Flow
  * Flow -- summed --> Balance
* Balance is often just a cached "sum".
* Also relevant to datsets: we often think of them as states but really they are a flow.

### Inbox

* [x] DataFlow paper: "The Dataflow Model: A Practical Approach to BalancingCorrectness, Latency, and Cost in Massive-Scale,Unbounded, Out-of-Order Data Processing" (2015)
* [ ] Stream vs Batch
  * [x] Streaming 101: The world beyond batch. A high-level tour of modern data-processing concepts. (Aug 2015)  https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-101 **Good intro to streaming and DataFlow by one of its authors**
  * [ ] https://www.oreilly.com/ideas/the-world-beyond-batch-streaming-102 Follow up to previous paper
* [ ] Apache Beam **in progress -- see below*
* [ ] dbt **initial review. Mainly a way conventient way of tracking in DB transforms**
* [ ] Frictionless DataFlows
* [x] Kreps (kafka author): https://www.oreilly.com/radar/questioning-the-lambda-architecture/
  * lambda architecture is where you run both batch and streaming in parallel as way to have traditional processing plus some kind of real-time results.
  * basically Kreps says its a PITA to keep two parallel systems running and you can just go "streaming" (remember we are beyond the dichotomy)

## Apache Beam

https://beam.apache.org/blog/2017/02/13/stateful-processing.html

### Pipeline

https://beam.apache.org/releases/pydoc/2.2.0/apache_beam.pipeline.html

Pipeline, the top-level Beam object.

A pipeline holds a DAG of data transforms. Conceptually the nodes of the DAG are transforms (PTransform objects) and the edges are values (mostly PCollection objects). The transforms take as inputs one or more PValues and output one or more PValue s.

The pipeline offers functionality to traverse the graph. The actual operation to be executed for each node visited is specified through a runner object.

Typical usage:

```python
# Create a pipeline object using a local runner for execution.
with beam.Pipeline('DirectRunner') as p:

  # Add to the pipeline a "Create" transform. When executed this
  # transform will produce a PCollection object with the specified values.
  pcoll = p | 'Create' >> beam.Create([1, 2, 3])

  # Another transform could be applied to pcoll, e.g., writing to a text file.
  # For other transforms, refer to transforms/ directory.
  pcoll | 'Write' >> beam.io.WriteToText('./output')

  # run() will execute the DAG stored in the pipeline.  The execution of the
  # nodes visited is done using the specified local runner.
```

## Airflow

Airflow organices tasks in a DAG. A DAG (Directed Acyclic Graph) is a collection of all the tasks you want to run, organized in a way that reflects their relationships and dependencies.

* Each task could be Bash, Python or others.
* You can connect the tasks in a DAG as you want (which one depends on which).
* Tasks could be built from Jinja templates.
* It has a nice and comfortable UI.

You can also use _Sensors_: you can wait for certain files or database changes for activate anoter jobs.

References

* https://github.com/apache/airflow
* https://medium.com/videoamp/what-we-learned-migrating-off-cron-to-airflow-b391841a0da4
* https://medium.com/@rbahaguejr/airflow-a-beautiful-cron-alternative-or-replacement-for-data-pipelines-b6fb6d0cddef


### airtunnel

https://github.com/joerg-schneider/airtunnel

* https://medium.com/bcggamma/airtunnel-a-blueprint-for-workflow-orchestration-using-airflow-173054b458c3 - excellent piece on how to pattern airflow - "airtunnel", plus overview of key tooling

  > This is why we postulate to have a central declaration file (as in YAML or JSON) per data asset, capturing all these properties required to run a generalized task (carried out by a custom operator). In other words, operators are designed in a generic way and receive the name of a data asset, from which they can grab its declaration file and learn how to parameterize and carry out the specific task.

```
├── archive
├── ingest
│   ├── archive
│   └── landing
├── ready
└── staging
    ├── intermediate
    ├── pickedup
    └── ready
```
