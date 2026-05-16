import Admin from '../models/Admin.js';

export const loginPage = (req, res) => {

  res.render('admin/login');

};

export const login = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body;

    const admin =
      await Admin.findOne({

        where: {
          email,
          password,
          status: 'active'
        }

      });

    if (!admin) {

      return res.render(
        'admin/login',
        {
          error:
            'Invalid email or password'
        }
      );

    }

    req.session.admin_id =
      admin.admin_id;

    req.session.admin_name =
      admin.name;

    req.session.save(() => {

  res.redirect('/admin/dashboard');

    });

  } catch (error) {

    console.log(error);

    res.send('Login failed');

  }

};

export const dashboard = (
  req,
  res
) => {

  res.render(
    'admin/dashboard',
    {
      admin_name:
        req.session.admin_name
    }
  );

};

export const logout = (
  req,
  res
) => {

  req.session.destroy(() => {

    res.redirect('/admin');

  });

};