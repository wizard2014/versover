<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;
use Zend\View\Model\JsonModel;

use Zend\Mail;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }

    public function contactsAction()
    {
        $request = $this->getRequest();

        if ($request->isXmlHttpRequest()) {
            $postData = $request->getPost()->toArray();

            $result = array();

            if (!empty($postData['email']) && !empty($postData['subject']) && !empty($postData['message'])) {
                if (filter_var($postData['email'], FILTER_VALIDATE_EMAIL)) {
                    array_walk($postData, function(&$item) {
                        $item = strip_tags($item);
                    });

                    $mail = new Mail\Message();

                    $mail->setBody($postData['text'])
                        ->setFrom($postData['email'], 'Sender')
                        ->addTo('versoverteam@gmail.com', 'Versover')
                        ->setSubject($postData['subject']);

                    try {
                        $transport = new Mail\Transport\Sendmail();
                        $transport->send($mail);

                        $result['success'] = 'Your email has been sent. We\'ll contact you shortly!';
                    } catch(\Exception $e) {
                        $result['error'] = 'Your email has not been sent. Please try again later, or contact us in any other way.';
                    }
                } else {
                    $result['error'] = 'Invalid email address.';
                }
            } else {
                $result['error'] = 'All fields are required';
            }

            return new JsonModel(array(
                'result' => json_encode($result)
            ));
        }

        return new ViewModel();
    }

    public function blogAction()
    {
        return new ViewModel();
    }
}