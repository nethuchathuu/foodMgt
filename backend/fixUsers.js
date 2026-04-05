const fs = require('fs');
const file = 'e:/foodMgt/backend/controllers/adminController.js';
let content = fs.readFileSync(file, 'utf8');

const newGetUsers = `exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: { $ne: 'admin' } });
    const userIds = allUsers.map(u => u._id);

    const persons = await Person.find({ userId: { $in: userIds } });
    const orgs = await Organization.find({ userId: { $in: userIds } });
    const rests = await Restaurant.find({ userId: { $in: userIds } });

    const users = allUsers.map(user => {
      let name = user.name || 'Unknown';
      let avatar = '';
      let roleLabel = 'User';

      if (user.role === 'requester_person') {
        const p = persons.find(pr => pr.userId.toString() === user._id.toString());
        if (p) { name = p.fullName || name; avatar = p.profilePicture || avatar; }
        roleLabel = 'User';
      } else if (user.role === 'requester_org') {
        const o = orgs.find(or => or.userId.toString() === user._id.toString());
        if (o) { name = o.orgName || name; avatar = o.representative?.profileImage?.fileUrl || avatar; }
        roleLabel = 'Organization';
      } else if (user.role === 'restaurant') {
        const r = rests.find(re => re.userId.toString() === user._id.toString());
        if (r) { name = r.restaurantName || name; avatar = r.restaurantImage || avatar; }
        roleLabel = 'Restaurant';
      }

      return {
        id: user._id,
        name,
        email: user.email,
        role: roleLabel,
        status: user.status || (user.isVerified ? 'Active' : 'Pending'),
        avatar
      };
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};`;

content = content.replace(/exports\.getUsers = async \(req, res\) => {[\s\S]*?res\.json\(users\);\s*} catch \(error\) {\s*res\.status\(500\)\.json\({ message: 'Server error', error: error\.message }\);\s*}\s*};/, newGetUsers);

fs.writeFileSync(file, content);
