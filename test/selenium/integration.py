from selenium import webdriver
import datetime
import os
import unittest
import traceback

class ProductTestSuite(unittest.TestCase):

    driver = None

    def test_homepage(self):
        self.check({
            '': {
                'title': 'Digital Public Library of America',
                'strings': [
                    "Online Exhibitions",
                    "Primary Source Sets",
                    "How can I use DPLA?",
                    "Stay informed",
                    "DPLA News"
                ]
            }
        })

    def test_exhibitions_homepage(self):
        self.check({
            '/exhibitions': {
                'title': 'Exhibitions | DPLA',
                'strings': [
                    "Exhibitions",
                    "Stories of national significance",
                    "Featured",
                    "American Empire",
                    "Race to the Moon",
                    "Activism in the US",
                    "Exhibitions curated by DPLA staff"
                ]
            }
        })

    def test_exhibition(self):
        default_strings = [
            'In This Exhibition',
            'Citation Information',
            'Explore Exhibition'
        ]
        self.check({
            '/exhibitions/radio-golden-age': {
                'title': 'Golden Age of Radio in the US | DPLA',
                'strings': default_strings + [
                    'Golden Age of Radio in the US',
                    'This is America... where you can listen to your radio in your living room,',
                    'history-making events as they happened.',
                    'This exhibition was created by Hillary Brady,'
                ]
            },
            '/exhibitions/outsiders-president-elections': {
                'title': 'Battle on the Ballot: Political Outsiders in US Presidential Elections | DPLA',
                'strings': default_strings + [
                    'Battle on the Ballot: Political Outsiders in US Presidential Elections',
                    'Congresswoman Shirley Chisholm',
                    'These stories share common themes',
                    'This exhibition was curated by DPLA staff members Samantha Gibson and Franky Abbott'
                ]
            },
            '/exhibitions/new-deal': {
                'title': 'America\'s Great Depression and Roosevelt\'s New Deal | DPLA',
                'strings': default_strings + [
                    'America\'s Great Depression and Roosevelt\'s New Deal',
                    'Franklin Delano Roosevelt. This material is protected by copyright law',
                    'The stock market crash on October 29',
                    'Digital Public Library of America and partners',
                ]
            }
        })

    def test_exhibition_page(self):
        default_strings = [
            'Exhibitions',
            'Close Exhibition'
        ]
        self.check({
            '/exhibitions/new-deal/recovery-programs': {
                'title': 'Recovery Programs | DPLA',
                'strings': default_strings + [
                    'Introduction',
                    'Roosevelt’s New Deal Recovery',
                    'View item information',
                    'Poster for the National Recovery Administration'
                ]
            },
            '/exhibitions/new-deal/recovery-programs/farm-security-administration': {
                'title': 'Recovery Programs | DPLA',
                'strings': default_strings + [
                    'Farm Security Administration (FSA)',
                    'created in 1937 under the Department of Agriculture',
                    'Fiddlin\' Bill Hensley'
                ]
            },
            '/exhibitions/shoe-industry-massachusetts/early-shoemaking': {
                'title': 'Early Shoemaking | DPLA',
                'strings': default_strings + [
                    'Introduction',
                    'Until America’s Colonial era',
                    'View item information',
                    'Courtesy of The New York Public Library'
                ]
            },
            '/exhibitions/shoe-industry-massachusetts/selling-shoes/stores': {
                'title': 'Selling Shoes | DPLA',
                'strings': default_strings + [
                    'Stores',
                    'As was the case for other retail establishments',
                    'Courtesy of Weymouth Public Libraries'
                ]
            },
            '/exhibitions/history-us-public-libraries/segregated-libraries/case-study-atlanta': {
                'title': 'Segregated Libraries | DPLA',
                'strings': default_strings + [
                    'At the turn of the twentieth century',
                    'Case Study: Atlanta',
                    'Photograph of Hallie B. Broker',
                ]
            }
        })

    def test_browse_by_partner(self):
        self.check({
            '/browse-by-partner': {
                'title': 'Browse by Partner | DPLA',
                'strings' : [
                    'HathiTrust',
                    'California Digital Library',
                    'OKHub'
                ]
            }
        })

    def test_browse_by_topic_homepage(self):
        self.check({
            '/browse-by-topic' : {
                'title' : 'Browse by Topic | DPLA',
                'strings' : [
                    'Browse by Topic',
                    'Highlights of collections from libraries',
                    'This is a new feature designed',
                    'Food',
                    'Aviation',
                    'Enjoying these topics',
                    'Visit Online Exhibitions'
                ]
            }
        })

    def test_browse_topic(self):
        self.check({
            '/browse-by-topic/baseball' : {
                'title': 'Baseball | DPLA',
                'strings' : [
                    'Baseball',
                    'African Americans',
                    'Discover the big-name players'
                ]
            },
            '/browse-by-topic/aviation' : {
                'title': 'Aviation | DPLA',
                'strings' : [
                    'Aviation',
                    'Sky-High Entertainment',
                    'Explore the history of the rise',
                    'Aviation on the Ground',
                    'Find out more about the aviation'
                ]
            }
        })

    def test_browse_subtopic(self):
        self.check({
            '/browse-by-topic/aviation/pioneering-pilots-1900-1940': {
                'title' : 'Pioneering Pilots, 1900-1940 | DPLA',
                'strings' : [
                    'Pioneering Pilots, 1900-1940',
                    'accomplishments propelled aviation forward'
                ]
            },
            '/browse-by-topic/immigration-since-1840/discrimination-and-reform': {
                'title': 'Discrimination and Reform | DPLA',
                'strings': [
                    'Discrimination and Reform',
                    'illustrate how xenophobia'
                ]
            },
            '/browse-by-topic/women-in-science/botany': {
                'title': 'Botany | DPLA',
                'strings': [
                    'Botany',
                    'pioneering work in the field and the lab'
                ]
            }
        })

    def test_pss_homepage(self):
        self.check({
            '/primary-source-sets': {
                'title': 'Primary Source Sets | DPLA',
                'strings' : [
                    'Primary Source Sets',
                    'collections exploring',
                    'Treaty of Versailles and the End of World War I',
                    'African Americans',
                    'Victorian Era',
                    'Space Race',
                    'Postwar United States',
                    'The American Whaling Industry',
                    'US History'
                ]
            }
        })

    def test_pss_set(self):
        default_strings = [
            'Primary Source Sets',
            'Created By',
            'Time Period',
            'Subjects',
            'Cite this',
            'Teaching Guide',
            'Additional Resources',
            'Source Set',
            'Related Primary Source Sets',
            'These sets were created and reviewed',
            'To give feedback'
        ]
        self.check({
            '/primary-source-sets/cotton-gin-and-the-expansion-of-slavery': {
                'title': 'Cotton Gin and the Expansion of Slavery | DPLA',
                'strings' : default_strings + [
                    'Cotton Gin and the Expansion of Slavery',
                    'recent college graduate Eli Whitney',
                    'Franky Abbott, Digital Public Library of America',
                    'US History',
                    'Revolution and the New Nation',
                    'A photograph of a cotton plant in bloom.',
                    'An illustration of enslaved people laboring on a cotton plantation, 1859.',
                    'National Constitution Center,'
                ]
            },
            '/primary-source-sets/fake-news-in-the-1890s-yellow-journalism': {
                'title': 'Fake News in the 1890s: Yellow Journalism | DPLA',
                'strings': default_strings + [
                    'Fake News in the 1890s: Yellow Journalism',
                    'post-truth have become common',
                    'Melissa Jacobs',
                    'The Emergence of Modern America',
                    'A cover of an issue',
                    'Ervin Wardman'
                ]
            }
        })

    def test_news(self):
        self.check({
            '/news' : {
                'title': 'News | DPLA',
                'strings': [
                    'News Archive',
                    'All News',
                    'Showing page',
                    'Next'
                ]
            }
        })

    def test_about(self):
        self.check({
            '/about/frequently-asked-questions': {
                'title': 'Frequently Asked Questions | DPLA',
                'strings': [
                    'What is DPLA?',
                    'Do you answer reference questions?'
                ]
            },
            '/about/search-tips': {
                'title': 'Search Tips | DPLA',
                'strings': [
                    'Searching for items in DPLA',
                    'Wildcards'
                ]
            },
            '/guides': {
                'title': 'Guides | DPLA',
                'strings': [
                    'Education',
                    'Lifelong Learning'
                ]
            },
            '/guides/the-family-research-guide-to-dpla': {
                'title': 'The Family Research Guide to DPLA | DPLA',
                'strings': [
                    'Explore DPLA',
                    'What else can you use?'
                ]
            },
            '/guides/the-scholarly-research-guide-to-dpla': {
                'title': 'The Scholarly Research Guide to DPLA | DPLA',
                'strings': [
                    'Other great features for scholarly research',
                    'Find out more information'
                ]
            }
        })

    def test_clicks(self):
        pass


    def check(self, data):
        for path, info in data.items():
            self.driver.get(site_root + path)
            if 'title' in info:
                self.assertEqual(self.driver.title, info['title'], "Title for %s is not %s." % (path, info['title']))
            if 'strings' in info:
                page = self.driver.page_source
                for string in info['strings']:
                    self.assertTrue(string in page, "Couldn't find string %s in %s." % (string, path))



if __name__ == "__main__":

    site_root = os.environ.get('TEST_SITE_ROOT', 'https://dp.la')
    username = os.environ.get('TEST_USERNAME', 'dpla1')
    password = os.environ.get('TEST_PASSWORD')

    connection_string = "http://%s:%s@hub.browserstack.com:80/wd/hub" \
                        % (username, password)

    browser_versions = [
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'IE',
            'browser_version': '11.0',
            'browserstack.debug': 'true',
        },
        {
            'os_version': '10.3',
            'device': 'iPhone 7',
            'real_mobile': 'true'
        },
        {
            'os_version': '7.0',
            'device': 'Samsung Galaxy S8',
            'real_mobile': 'true'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'Edge',
            'browser_version': '16.0'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'Chrome',
            'browser_version': '64.0'
        },
        {
            'os': 'Windows',
            'os_version': '10',
            'browser': 'Firefox',
            'browser_version': '57.0'
        },
        {
            'os': 'OS X',
            'os_version': 'High Sierra',
            'browser': 'Safari',
            'browser_version': '11.0'
        },
        {
            'os': 'OS X',
            'os_version': 'High Sierra',
            'browser': 'Chrome',
            'browser_version': '64.0'
        },
        {
            'os': 'OS X',
            'os_version': 'High Sierra',
            'browser': 'Firefox',
            'browser_version': '56.0',
        }
    ]

    datetime = datetime.datetime.utcnow().isoformat()
    label = "Hostname: %s | Username: %s | Datetime: %s" \
            % (site_root, username, datetime)

    generic_capabilities = {
        'build': label,
        'project': 'DPLA Frontend',
        'name': 'Website Smoke Test',
        'browserstack.debug' : 'true',
        'browserstack.selenium_version': '3.5.2'
    }

    for browser_version in browser_versions:
        print("Testing " + str(browser_version))
        try:
            driver = webdriver.Remote(
                command_executor=connection_string,
                desired_capabilities={
                    **generic_capabilities,
                    **browser_version
                }
            )
            if 'browser' not in browser_version \
                    or browser_version['browser'] != 'Firefox':
                driver.implicitly_wait(60)
            ProductTestSuite.driver = driver
            ProductTestSuite.root = site_root
            unittest.main(exit=False)
        except:
            print("EXECUTION FAILED")
            print(print(traceback.format_exc()))
        finally:
            driver.quit()