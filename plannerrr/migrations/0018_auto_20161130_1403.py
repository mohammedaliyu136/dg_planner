# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-11-30 13:03
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('planner', '0017_remove_degree_req_major_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='degree_req',
            old_name='course_title',
            new_name='major_name',
        ),
    ]
