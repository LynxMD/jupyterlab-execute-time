"""Smoke tests for the Python package that ships the prebuilt extension."""

import json
from pathlib import Path

import jupyterlab_execute_time

PACKAGE_DIR = Path(jupyterlab_execute_time.__file__).parent


def test_version_matches_labextension_package_json():
    data = json.loads((PACKAGE_DIR / "labextension" / "package.json").read_text())
    assert jupyterlab_execute_time.__version__ == data["version"]


def test_labextension_paths_point_at_built_extension():
    paths = jupyterlab_execute_time._jupyter_labextension_paths()
    assert paths == [{"src": "labextension", "dest": "jupyterlab-execute-time"}]
    assert (PACKAGE_DIR / "labextension" / "static").is_dir()
