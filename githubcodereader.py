import nest_asyncio
nest_asyncio.apply()

from llama_index.core import VectorStoreIndex
from llama_index.readers.github import GithubRepositoryReader, GithubClient
from IPython.display import Markdown, display
import os
from dotenv import load_dotenv

load_dotenv()

github_token = os.environ.get("GITHUB_TOKEN")
if not github_token:
    raise EnvironmentError("GITHUB_TOKEN environment variable not set. Please set it in your .env file or environment.")

owner = "nhwzaan"
repo = "test-repository"
branch = "main"

github_client = GithubClient(github_token=github_token, verbose=True)

documents = GithubRepositoryReader(
    github_client=github_client,
    owner=owner,
    repo=repo,
    use_parser=False,
    verbose=False,
    filter_directories=(
        ["docs"],
        GithubRepositoryReader.FilterType.INCLUDE,
    ),
    filter_file_extensions=(
        [
            ".png",
            ".jpg",
            ".jpeg",
            ".gif",
            ".svg",
            ".ico",
            "json",
            ".ipynb",
        ],
        GithubRepositoryReader.FilterType.EXCLUDE,
    ),
).load_data(branch=branch)

print(documents)