import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import AnimatedPage from './AnimatedPage';
import { account } from '../appwrite';
import Swal from 'sweetalert2';
import { v4 as uuidv4 } from 'uuid';
import Basicheader from "../components/Basicheader"
import { appwrite, databases} from '../appwrite';
import { analytics } from "../firebase";
import { useEffect } from "react";
import { logEvent } from 'firebase/analytics';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: '#4F46E5',
    padding: '1rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: '#FFFFFF',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '500px',
  },
  textField: {
    marginBottom: '1.5rem',
    width: '100%',
  },
  button: {
    marginTop: '1.5rem',
    background: '#4F46E5',
    color: '#FFFFFF',
    '&:hover': {
      background: '#3B318F',
    },
  },
  link: {
    color: '#FFFFFF',
  },
  blueLink: {
    color: 'blue',
  },
}));

function Signup() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [country, setCountry] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [termsDialogOpen, setTermsDialogOpen] = useState(false);
  const [privacyDialogOpen, setPrivacyDialogOpen] = useState(false);

  const handleTermsDialogOpen = () => {
    setTermsDialogOpen(true);
  };

  const handleTermsDialogClose = () => {
    setTermsDialogOpen(false);
  };

  const handlePrivacyDialogOpen = () => {
    setPrivacyDialogOpen(true);
  };

  const handlePrivacyDialogClose = () => {
    setPrivacyDialogOpen(false);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCompanyNameChange = (e) => {
    setCompanyName(e.target.value);
  };

  const handleJobTitleChange = (e) => {
    setJobTitle(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleTermsChange = (e) => {
    setTermsChecked(e.target.checked);
  };

  const handlePrivacyChange = (e) => {
    setPrivacyChecked(e.target.checked);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    logEvent(analytics, 'Signup_page', { page_path: window.location.pathname });
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    Swal.showLoading()

    try {
      const user = { 
          full_name: fullName,
          email,
          password,
          company_name: companyName,
          job_title: jobTitle,
          industry,
          country,
          phone_number: phoneNumber
      };

      const response = await fetch('https://pythonmosiai.azurewebsites.net/signup/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(user)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } else {
          // Handle success
          const data = await response.json();
          localStorage.setItem('userEmail', email); 
          console.log(data);
          Swal.fire('Success', 'Account created successfully', 'success');
          navigate('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Swal.fire('Error', 'Failed to create account', 'error');
      if (error.response) {
          console.log('Server response', error.response.data);
      }
    }
};



  
  return (
    <div className={`${classes.container} ${classes.color}`}>

      <Basicheader/>

      <div className={`${classes.container} ${classes.color}`} style={{ marginTop: '50px', padding: '20px' }}>
      <AnimatedPage>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            label="Full Name"
            type="text"
            value={fullName}
            onChange={handleFullNameChange}
            variant="outlined"
            required
          />
          <TextField
            className={classes.textField}
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            required
          />
          <TextField
            className={classes.textField}
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            variant="outlined"
            required
          />
          <TextField
            className={classes.textField}
            label="Company Name"
            type="text"
            value={companyName}
            onChange={handleCompanyNameChange}
            variant="outlined"
            required
          />
          <TextField
            className={classes.textField}
            label="Job Title"
            type="text"
            value={jobTitle}
            onChange={handleJobTitleChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            label="Industry"
            type="text"
            value={industry}
            onChange={handleIndustryChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            label="Country"
            type="text"
            value={country}
            onChange={handleCountryChange}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            label="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            variant="outlined"
          />
          <div>
            <label>
              <input
                type="checkbox"
                checked={termsChecked}
                onChange={handleTermsChange}
              />{' '}
              Accept Terms and Conditions
            </label>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={privacyChecked}
                onChange={handlePrivacyChange}
              />{' '}
              Accept Privacy Policy
            </label>
          </div>
          <Button
            className={classes.button}
            variant="contained"
            type="submit"
            disabled={!termsChecked || !privacyChecked || loading}
          >
            Sign Up
          </Button>
          <p>
            Already have an account?{' '}
           <Link to="/login" className="text-blue-500 hover:text-blue-700">
    Login
  </Link>
          </p>
          <p>
  By signing up, you agree to our{' '}
  <span
    className={`${classes.link} ${classes.blueLink}`}
    onClick={handleTermsDialogOpen}
    style={{ cursor: 'pointer' }}
  >
    Terms and Conditions
  </span>{' '}
  and{' '}
  <span
    className={`${classes.link} ${classes.blueLink}`}
    onClick={handlePrivacyDialogOpen}
    style={{ cursor: 'pointer' }}
  >
    Privacy Policy
  </span>
</p>

<Dialog open={termsDialogOpen} onClose={handleTermsDialogClose}>
        <DialogTitle>Terms and Conditions</DialogTitle>
        <DialogContent>
        Terms and Conditions

These Terms and Conditions ("Agreement") govern your access and use of the AI Automation Business Suite provided by Picent Technologies Limited ("Picent"). By accessing or using our software, you agree to be bound by this Agreement.

1. License:
   a. Subject to the terms and conditions of this Agreement, Picent grants you a non-exclusive, non-transferable license to use the AI Automation Business Suite for your internal business purposes.
   b. You may not sublicense, distribute, or transfer any part of the software to any third party without the express written consent of Picent.

2. Intellectual Property:
   a. The AI Automation Business Suite and all related intellectual property rights are and will remain the exclusive property of Picent.
   b. You may not modify, reproduce, or create derivative works based on the software without the prior written consent of Picent.

3. User Responsibilities:
   a. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
   b. You agree not to use the AI Automation Business Suite for any illegal, harmful, or unauthorized purposes.
   c. You will comply with all applicable laws and regulations in your use of the software.

4. Privacy:
   a. Picent respects your privacy and handles your personal information in accordance with its Privacy Policy.
   b. By using the AI Automation Business Suite, you consent to the collection, use, and disclosure of your personal information as described in the Privacy Policy.

5. Disclaimer of Warranty:
   a. The AI Automation Business Suite is provided "as is" without any warranty, express or implied, including, but not limited to, the implied warranties of merchantability and fitness for a particular purpose.
   b. Picent does not warrant that the software will be error-free, uninterrupted, or free from viruses or other harmful components.

6. Limitation of Liability:
   a. To the maximum extent permitted by law, Picent shall not be liable for any indirect, incidental, special, or consequential damages arising out of or in connection with the use of the AI Automation Business Suite.
   b. Picent's total liability, whether in contract, tort, or otherwise, shall not exceed the fees paid by you for the use of the software.

7. Termination:
   a. Picent may terminate this Agreement at any time for any reason, without notice.
   b. Upon termination, you must immediately cease all use of the AI Automation Business Suite.

8. Governing Law:
   This Agreement shall be governed by and construed in accordance with the laws of Uganda, without regard to its conflict of laws principles.

By using the AI Automation Business Suite, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.

If you have any questions or concerns regarding this Agreement, please contact us at [contact information].

Last updated: 21 March 2023

        </DialogContent>
        <DialogActions>
          <Button onClick={handleTermsDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={privacyDialogOpen} onClose={handlePrivacyDialogClose}>
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
        Privacy Policy

Effective Date: March 22, 2023

At Picent Technologies Limited ("Picent"), we are committed to protecting the privacy and security of the personal information of our users. This Privacy Policy outlines how we collect, use, disclose, and protect the personal information provided to us through our website, software, and services (collectively referred to as the "Services").

Information We Collect
We may collect the following types of personal information from our users:

Name
Contact information (such as email address, phone number, and mailing address)
Company name and job title
Industry information
User preferences and settings
Usage data and analytics
Other information provided by users voluntarily
Use of Personal Information
We use the personal information we collect for the following purposes:

To provide and improve our Services
To communicate with users and respond to their inquiries
To personalize and customize user experience
To analyze and monitor usage patterns and trends
To enforce our terms and conditions and protect the rights and safety of our users and Picent
To comply with legal obligations
Disclosure of Personal Information
We may disclose personal information in the following circumstances:

With the user's consent
To third-party service providers who assist us in delivering our Services
To comply with legal obligations or respond to lawful requests and legal process
To protect the rights, property, or safety of Picent, our users, or others
Data Security
We take reasonable measures to protect the personal information we collect and store. However, no method of transmission over the internet or electronic storage is 100% secure. Therefore, while we strive to use commercially acceptable means to protect personal information, we cannot guarantee its absolute security.

Third-Party Websites and Services
Our Services may contain links to third-party websites or services. We are not responsible for the privacy practices or the content of such websites or services. We encourage users to review the privacy policies of those third parties before providing any personal information.

International Data Transfers
Your personal information may be transferred to and processed in countries other than your own. By using our Services, you consent to the transfer of your personal information to these countries.

Children's Privacy
Our Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under the age of 13. If you believe that we may have collected personal information from a child under 13, please contact us, and we will take appropriate steps to delete that information.

Changes to the Privacy Policy
We may update this Privacy Policy from time to time. We will notify users of any significant changes by posting the revised Privacy Policy on our website or through other means. It is advised to review this Privacy Policy periodically for any changes.

Contact Us
If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, please contact us at team@picent.tech.
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrivacyDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </form>
      </AnimatedPage>
      </div>
      {loading && (
        <div>
          <p>Please wait while we process your request.</p>
        </div>
      )}
    </div>
  );
}

export default Signup;

