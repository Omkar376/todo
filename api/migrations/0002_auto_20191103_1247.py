# Generated by Django 2.2.6 on 2019-11-03 12:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='todo',
            old_name='owner',
            new_name='user',
        ),
    ]
