<?php

	Class extension_Click_To_Import extends Extension{

		public function about(){
			return array('name' => 'Click-to-import',
						 'version' => '0.1.1',
						 'author' => array(
							'name' => 'Simone Economo',
							'website' => 'http://www.lineheight.net',
							'email' => 'my.ekoes@gmail.com'
						 ),
					);
		}

		public function getSubscribedDelegates(){
			return array(
				array(
					'page' => '/backend/',
					'delegate' => 'InitaliseAdminPageHead',
					'callback' => '__appendScripts'
				),
			);
		}

		public function __appendScripts($context) {
			$callback = $context['parent']->getPageCallback();

			if (in_array($callback['driver'], array('blueprintspages', 'blueprintsutilities')))
				$context['parent']->Page->addScriptToHead(URL . '/extensions/click_to_import/assets/click-to-import.js', 1000, false);
		}


	}

?>
