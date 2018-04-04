from distutils.core import setup

setup(
    name = 'dpla-frontend',
    version = '0.0.1',
    description='DPLA Frontend Test Suite',
    author='Digital Public Library of America',
    author_email='tech@dp.la',
    url='https://dp.la',
    package_dir={'selenium':'lib'},
    packages=[ 'selenium' ]
)
