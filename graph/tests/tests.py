#!/usr/bin/env python3
# coding: utf-8

from hamcrest import *
import unittest

class ExampleTest(unittest.TestCase):
	def example_equals(self):
		a = 1
		b = 1
		assert_that(a, equal_to(b))
		assert_that(a, is_(b))  # same as the line before (syntactic sugar)

if __name__ == '__main__':
	unittest.main()

