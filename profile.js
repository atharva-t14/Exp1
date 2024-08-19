window.addEventListener('DOMContentLoaded', function () {
    const profileOutput = document.getElementById('profileOutput');

    // Retrieve profile data from localStorage
    const profileData = JSON.parse(localStorage.getItem('profileData'));

    if (profileData) {
        // Profile Photo Handling
        let profilePhotoHTML = '';
        if (profileData.profilePhoto) {
            profilePhotoHTML = `<img src="${profileData.profilePhoto}" alt="Profile Photo" class="profile-photo">`;
        }

        // Generate Profile Output
        profileOutput.innerHTML = `
            <div class="profile-heading">
                <h1>${profileData.headingLine}</h1>
            </div>

            <div class="profile-info">
                ${profilePhotoHTML}
                <p><strong>Name:</strong> ${profileData.name}</p>
                <p><strong>Date of Birth:</strong> ${profileData.dob} (Age: ${profileData.age})</p>
                <p><strong>Gender:</strong> ${profileData.gender}</p>
                <p><strong>Location:</strong> ${profileData.location}</p>
            </div>

            <div class="profile-section">
                <h3>Educational Details</h3>
                ${profileData.education.map(edu => `
                    <p><strong>${edu.collegeName} (${edu.startYear} - ${edu.endYear})</strong></p>
                    <p><strong>Degree:</strong> ${edu.degree}</p>
                    <p><strong>Course:</strong> ${edu.course}</p>
                    <p><strong>Results:</strong> ${edu.achievedGrade}/${edu.maxGrade}</p>
                `).join('<hr>')}
            </div>

            <div class="profile-section">
                <h3>Technical Skills</h3>
                <ul>
                    ${profileData.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </div>

            <div class="profile-section">
                <h3>Projects</h3>
                ${profileData.projects.map(proj => `
                    <p><strong>Title:</strong> ${proj.title}</p>
                    <p><strong>Description:</strong> ${proj.description}</p>
                    ${proj.stack ? `<p><strong>Technology Stack:</strong> ${proj.stack}</p>` : ''}
                    ${proj.link ? `<p><a href="${proj.link}" target="_blank">View Code</a></p>` : ''}
                `).join('<hr>')}
            </div>

            <div class="profile-section">
                <h3>Hobbies</h3>
                <ul>
                    ${profileData.hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
                </ul>
            </div>

            <div class="profile-section">
                <h3>Coding Profiles</h3>
                <ul>
                    ${profileData.github ? `<li><a href="${profileData.github}" target="_blank">GitHub</a></li>` : ''}
                    ${profileData.leetcode ? `<li><a href="${profileData.leetcode}" target="_blank">LeetCode</a></li>` : ''}
                    ${profileData.codeforces ? `<li><a href="${profileData.codeforces}" target="_blank">Codeforces</a></li>` : ''}
                    ${profileData.codechef ? `<li><a href="${profileData.codechef}" target="_blank">CodeChef</a></li>` : ''}
                </ul>
            </div>

            <div class="profile-section profile-links">
                <h3>Let's Connect</h3>
                <p><strong>Email:</strong> ${profileData.email}</p>
                <p><strong>Phone:</strong> ${profileData.countryCode} ${profileData.phone}</p>
                ${profileData.linkedin ? `<p><strong>LinkedIn:</strong> <a href="${profileData.linkedin}" target="_blank">${profileData.linkedin}</a></p>` : ''}
            </div>
        `;
    }
});
