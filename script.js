// Real-time email validation
document.getElementById('email').addEventListener('input', function () {
    const emailField = this;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(emailField.value)) {
        emailField.setCustomValidity("Please enter a valid email address.");
        emailField.reportValidity();
    } else {
        emailField.setCustomValidity("");
    }
});

// Real-time phone number validation
document.getElementById('phone').addEventListener('input', function () {
    const phoneField = this;
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(phoneField.value)) {
        phoneField.setCustomValidity("Please enter a 10-digit phone number.");
        phoneField.reportValidity();
    } else {
        phoneField.setCustomValidity("");
    }
});

// Handle 'Other' option in the degree dropdown
document.getElementById('degree').addEventListener('change', function () {
    const otherField = document.getElementById('degreeOther');
    if (this.value === 'Other') {
        otherField.style.display = 'block';
        otherField.required = true;
    } else {
        otherField.style.display = 'none';
        otherField.required = false;
    }
});

// Add more education sections
document.getElementById('addEducation').addEventListener('click', function () {
    const educationSection = document.getElementById('educationSection');
    const newEducation = document.createElement('div');
    newEducation.className = 'education';
    newEducation.innerHTML = `
        <div class="form-group">
            <label for="degree">Degree <span class="required">*</span></label>
            <select name="degree" required>
                <option value="" disabled selected>Select your degree</option>
                <option value="High School">High School</option>
                <option value="Junior College">Junior College</option>
                <option value="Bachelor of Science">Bachelor of Science</option>
                <option value="Bachelor of Arts">Bachelor of Arts</option>
                <option value="Bachelor of Engineering">Bachelor of Engineering</option>
                <option value="Master of Science">Master of Science</option>
                <option value="Master of Arts">Master of Arts</option>
                <option value="Doctor of Philosophy">P.H.D</option>
                <option value="Other">Other (Please specify)</option>
            </select>
            <input type="text" name="degreeOther" placeholder="Specify your degree" style="display: none;">
        </div>
        <div class="form-group">
            <label for="collegeName">College Name <span class="required">*</span></label>
            <input type="text" name="collegeName" placeholder="College Name" required>
        </div>
        <div class="form-group">
            <label for="course">Course <span class="required">*</span></label>
            <input type="text" name="course" placeholder="Course" required>
        </div>
        <div class="form-group">
            <label for="startYear">Start Year <span class="required">*</span></label>
            <input type="number" name="startYear" placeholder="Start Year" min="1900" max="2100" required>
        </div>
        <div class="form-group">
            <label for="endYear">Year of Passing <span class="required">*</span></label>
            <input type="number" name="endYear" placeholder="Year of Passing" min="1900" max="2100" required>
        </div>
        <div class="form-group">
            <label for="maxGrade">Maximum Possible Grade <span class="required">*</span></label>
            <input type="text" name="maxGrade" placeholder="Maximum Possible Grade" required>
        </div>
        <div class="form-group">
            <label for="achievedGrade">Achieved Grade <span class="required">*</span></label>
            <input type="text" name="achievedGrade" placeholder="Achieved Grade" required>
        </div>
    `;
    educationSection.appendChild(newEducation);

    // Attach event listener to 'Other' option in the new degree dropdown
    newEducation.querySelector('select[name="degree"]').addEventListener('change', function () {
        const otherField = this.nextElementSibling;
        if (this.value === 'Other') {
            otherField.style.display = 'block';
            otherField.required = true;
        } else {
            otherField.style.display = 'none';
            otherField.required = false;
        }
    });
});

// Add more skills
document.getElementById('addSkill').addEventListener('click', function () {
    const skillsSection = document.getElementById('skillsSection');
    const newSkill = document.createElement('div');
    newSkill.className = 'form-group';
    newSkill.innerHTML = `
        <label for="skills">Technical Skill <span class="required">*</span></label>
        <input type="text" name="skills" placeholder="Enter a technical skill" required>
    `;
    skillsSection.appendChild(newSkill);
});

// Add more projects
document.getElementById('addProject').addEventListener('click', function () {
    const projectsSection = document.getElementById('projectsSection');
    const newProject = document.createElement('div');
    newProject.className = 'project';
    newProject.innerHTML = `
        <div class="form-group">
            <label for="projectTitle">Project Title <span class="required">*</span></label>
            <input type="text" name="projectTitle" placeholder="Project Title" required>
        </div>
        <div class="form-group">
            <label for="projectDescription">Project Description <span class="required">*</span></label>
            <textarea name="projectDescription" placeholder="Describe your project" required></textarea>
        </div>
        <div class="form-group">
            <label for="projectStack">Technology Stack</label>
            <input type="text" name="projectStack" placeholder="Technology Stack (Optional)">
        </div>
        <div class="form-group">
            <label for="projectLink">Project Code Link (Optional)</label>
            <input type="url" name="projectLink" placeholder="Project Code Link (Optional)">
        </div>
    `;
    projectsSection.appendChild(newProject);
});

// Add more hobbies
document.getElementById('addHobby').addEventListener('click', function () {
    const hobbiesSection = document.getElementById('hobbiesSection');
    const newHobby = document.createElement('div');
    newHobby.className = 'form-group';
    newHobby.innerHTML = `
        <label for="hobbies">Hobby <span class="required">*</span></label>
        <input type="text" name="hobbies" placeholder="Enter a hobby" required>
    `;
    hobbiesSection.appendChild(newHobby);
});

// Handle form submission and data extraction
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Calculate age from DOB
    const dob = new Date(formData.get('dob'));
    const age = new Date().getFullYear() - dob.getFullYear();

    const profileData = {
        name: formData.get('name'),
        dob: formData.get('dob'),
        age: age,
        gender: formData.get('gender'),
        email: formData.get('email'),
        countryCode: formData.get('countryCode'),
        phone: formData.get('phone'),
        location: formData.get('location') || 'Not specified',
        education: [],
        skills: formData.getAll('skills'),
        projects: [],
        hobbies: formData.getAll('hobbies'),
        github: formData.get('github') || 'Not provided',
        leetcode: formData.get('leetcode') || 'Not provided',
        codeforces: formData.get('codeforces') || 'Not provided',
        codechef: formData.get('codechef') || 'Not provided',
        linkedin: formData.get('linkedin'),
        headingLine: formData.get('headingLine') || 'Welcome to my Profile',
    };

    // Collect all education details
    document.querySelectorAll('#educationSection .education').forEach(function (eduElement) {
        const degree = eduElement.querySelector('select[name="degree"]').value;
        const degreeOther = eduElement.querySelector('input[name="degreeOther"]').value;
        const collegeName = eduElement.querySelector('input[name="collegeName"]').value;
        const course = eduElement.querySelector('input[name="course"]').value;
        const startYear = eduElement.querySelector('input[name="startYear"]').value;
        const endYear = eduElement.querySelector('input[name="endYear"]').value;
        const maxGrade = eduElement.querySelector('input[name="maxGrade"]').value;
        const achievedGrade = eduElement.querySelector('input[name="achievedGrade"]').value;

        profileData.education.push({
            degree: degree === 'Other' ? degreeOther : degree,
            collegeName: collegeName,
            course: course,
            startYear: startYear,
            endYear: endYear,
            maxGrade: maxGrade,
            achievedGrade: achievedGrade
        });
    });

    // Collect all project details
    document.querySelectorAll('#projectsSection .project').forEach(function (projElement) {
        const title = projElement.querySelector('input[name="projectTitle"]').value;
        const description = projElement.querySelector('textarea[name="projectDescription"]').value;
        const stack = projElement.querySelector('input[name="projectStack"]').value;
        const link = projElement.querySelector('input[name="projectLink"]').value;

        profileData.projects.push({
            title: title,
            description: description,
            stack: stack || '',
            link: link || ''
        });
    });

    // Handle profile photo
    const profilePhoto = formData.get('profilePhoto');
    if (profilePhoto && profilePhoto.size > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profileData.profilePhoto = e.target.result;
            localStorage.setItem('profileData', JSON.stringify(profileData));
            window.location.href = 'profile.html';
        };
        reader.readAsDataURL(profilePhoto);
    } else {
        localStorage.setItem('profileData', JSON.stringify(profileData));
        window.location.href = 'profile.html';
    }
});

// Toggle Collapsible Sections
function toggleSection(sectionHeader) {
    const content = sectionHeader.nextElementSibling;
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    sectionHeader.classList.toggle('active');
}

// Initialize all sections as collapsed
document.querySelectorAll('.form-section .content').forEach(content => {
    content.style.display = 'none';
});
