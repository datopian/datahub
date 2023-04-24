# CKAN: Getting Started for Development

## Prerequisites

CKAN has a rich tech stack so we have opted to standardize our instructions with Docker Compose, which will help you spin up every service in a few commands.

If you already have Docker-compose, you are ready to go!

If not, please, follow instructions on [how to install docker-compose](https://docs.docker.com/compose/install/).

On Ubuntu you can run:

```
sudo apt-get update
sudo apt-get install docker-compose
```

## Cloning the repo

```
git clone https://github.com/okfn/docker-ckan
# or git clone git@github.com:okfn/docker-ckan.git
cd docker-ckan
```

## Booting CKAN

Create a local environment file:

```
cp .env.example .env
```

Build and Run the instances:

> [!tip]'docker-compose' must be run with 'sudo'. If you want to change this, you can follow the steps below. NOTE: The 'docker' group grants privileges equivalent to the 'root' user.  

Create the `docker` group: `sudo groupadd docker`  

Add your user to the `docker` group: `sudo usermod -aG docker $USER`  

Change the storage directory ownership from `root` to `ckan` by adding the commads below to the `ckan/Dockerfile.dev`

```
RUN mkdir -p /var/lib/ckan/storage/uploads
RUN chown -R ckan:ckan /var/lib/ckan/storage
```

At this point, you can log out and log back in for these changes to apply. You can also use the command `newgrp docker` to temporarily enable the new group for the current terminal session.

```
docker-compose -f docker-compose.dev.yml up --build
```

When you see this log message:

![](https://i.imgur.com/WUIiNRt.png)

You can navigate to `http://localhost:5000`

![CKAN Home Page](https://i.imgur.com/T5LWo8A.png)

and log in with the credentials that docker-compose setup created for you [user: `ckan_admin` password:`test1234`].

>[!tip]To learn key concepts about CKAN, including what it is and how it works, you can read the User Guide.
[CKAN User Guide](https://docs.ckan.org/en/2.8/user-guide.html).


## Next Steps

[Play around with CKAN portal](/docs/dms/ckan/play-around).

## Troubleshooting

Login / Logout button breaks the experience:

- Change the URL from `http://ckan:5000` to `http://localhost:5000`. A complete fix is described in the [Play around with CKAN portal](/docs/dms/ckan/play-around). (Your next step. ;))
