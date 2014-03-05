package com.example.andoridmvp;

import org.xylem.*;

import tst.Tst;
import android.app.Activity;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.os.Bundle;

public class MainActivity extends Activity {
	
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		initFragment(new PaneFrag02());
		
		new Tst().init();
		
	}

	/**
	 * boilerplate:
	 */
	protected void initFragment(Fragment frag) {
		FragmentManager fragmentManager = getFragmentManager();
		FragmentTransaction fragmentTransaction = fragmentManager
				.beginTransaction();
		fragmentTransaction.replace(android.R.id.content, frag);
		fragmentTransaction.commit();
	}

}