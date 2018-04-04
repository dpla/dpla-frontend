# Prerequisites

- pyenv: https://github.com/pyenv/pyenv
- python 3: `pyenv install 3.6.0`
- virtualenv: `pyenv shell 3.6.0 ; pip install virtualenv`

# Installation

- Change directory to where this file is
- `pyenv local 3.6.0`
- `virtualenv .`
- `source bin/activate`
- `pip install -r requirements.txt`


# Running

The arguments that tell the script what site to point to and how to talk to Browserstack are fed in with environment variables to avoid messing with the `unittest` framework. Most of them have sane defaults for DPLA, but the password is required. The browserstack password can be found by logging in to the Browserstack, going to `automate`, and clicking on `Username and Access Keys`. Note that this password is not the same as the Browserstack webapp login.

An invocation looks like:

`TEST_SITE_ROOT="https://dplabeta.org" TEST_PASSWORD="$browserstack-password" python integration.py`

Currently there are issues with Selenium not waiting around long enough for the page to load on both mobile and desktop Safari.

The test suite will report failures and successes on the console. A recording of the session for each browser will also be available in Browserstack Automate, but that will only report failures with the test suite execution, not failed expectations.
