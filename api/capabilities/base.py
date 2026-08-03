"""
Abstract Base Capability.
All capability modules inherit from this class.
"""

from abc import ABC, abstractmethod


class BaseCapability(ABC):
    """
    Abstract base for all capability modules.
    Each capability retrieves relevant knowledge for a given query.
    """

    @property
    @abstractmethod
    def name(self) -> str:
        """Unique capability identifier."""
        ...

    @abstractmethod
    def retrieve(self, query: str) -> str:
        """
        Retrieve relevant context for the given query.
        Returns formatted string context to inject into the prompt.
        """
        ...
